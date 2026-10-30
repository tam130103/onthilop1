/**
 * Backup Manager (Sao lưu & Khôi phục Toàn diện)
 * Quản lý xuất/nhập toàn bộ dữ liệu ứng dụng:
 * 1. Dữ liệu lớp học (danh sách học sinh, điểm 4 đội, đồng hồ)
 * 2. Các bài học do giáo viên tự soạn
 * 3. Lịch sử câu hỏi hay trả lời sai
 * 4. Kịch bản các buổi dạy
 * 5. Toàn bộ file ghi âm giọng nói trong IndexedDB (mã hóa Base64 di động)
 * Kèm cơ chế yêu cầu quyền lưu trữ bền vững navigator.storage.persist().
 */

import { getClassroomStore, type ClassroomData } from './classroom-store';
import { getCustomLessons, setCustomLessons } from './lesson-storage';
import { getMistakeTracker, type MistakeEntry } from './mistake-tracker';
import { getCustomSessions, setCustomSessions, type TeachingSession } from './session-storage';
import { getAllAudioRecordings, saveRawAudioEntry, type AudioRecordEntry } from './audio-storage';
import type { Lesson } from '@/schemas/content.schema';

export interface SerializedAudio {
  id: string;
  mimeType: string;
  durationMs: number;
  createdAt: number;
  base64Data: string;
}

export interface FullBackupPackage {
  version: 1;
  appName: 'trinh-chieu-lop1';
  exportedAt: string;
  classroomData: ClassroomData;
  customLessons: Lesson[];
  mistakes: MistakeEntry[];
  teachingSessions: TeachingSession[];
  audioRecordings: SerializedAudio[];
}

export interface BackupImportStats {
  studentsCount: number;
  lessonsCount: number;
  mistakesCount: number;
  sessionsCount: number;
  audioCount: number;
}

export interface StoragePersistenceStatus {
  isPersisted: boolean;
  quotaBytes?: number;
  usageBytes?: number;
}

/**
 * Kiểm tra và yêu cầu trình duyệt cấp quyền lưu trữ vĩnh viễn (không bị xóa tự động khi thiếu dung lượng ổ đĩa)
 */
export async function checkAndRequestStoragePersistence(): Promise<StoragePersistenceStatus> {
  if (typeof navigator === 'undefined' || !navigator.storage) {
    return { isPersisted: false };
  }

  let isPersisted = false;
  try {
    if (navigator.storage.persisted) {
      isPersisted = await navigator.storage.persisted();
    }
    if (!isPersisted && navigator.storage.persist) {
      isPersisted = await navigator.storage.persist();
    }
  } catch (e) {
    console.warn('[BackupManager] Storage persist request error:', e);
  }

  let quotaBytes: number | undefined;
  let usageBytes: number | undefined;
  try {
    if (navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      quotaBytes = estimate.quota;
      usageBytes = estimate.usage;
    }
  } catch {
    // ignore
  }

  return { isPersisted, quotaBytes, usageBytes };
}

/**
 * Chuyển Blob thành chuỗi Base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      // Strip "data:*/*;base64," header
      const commaIdx = res.indexOf(',');
      resolve(commaIdx >= 0 ? res.slice(commaIdx + 1) : res);
    };
    reader.onerror = () => reject(new Error('Lỗi chuyển đổi Blob sang Base64'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Chuyển chuỗi Base64 trở lại thành Blob
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteChars = atob(base64);
  const byteNumbers = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type: mimeType });
}

/**
 * Tạo gói sao lưu hoàn chỉnh dưới dạng object
 */
export async function createFullBackupPackage(): Promise<FullBackupPackage> {
  const classroomData = getClassroomStore().getData();
  const customLessons = getCustomLessons();
  const mistakes = getMistakeTracker().getMistakes();
  const teachingSessions = getCustomSessions();

  // Đọc toàn bộ audio từ IndexedDB và chuyển sang Base64
  const rawAudios = await getAllAudioRecordings();
  const serializedAudios: SerializedAudio[] = [];

  for (const item of rawAudios) {
    try {
      if (item.blob) {
        const base64Data = await blobToBase64(item.blob);
        serializedAudios.push({
          id: item.id,
          mimeType: item.mimeType,
          durationMs: item.durationMs,
          createdAt: item.createdAt,
          base64Data,
        });
      }
    } catch (e) {
      console.warn(`[BackupManager] Failed to serialize audio ${item.id}:`, e);
    }
  }

  return {
    version: 1,
    appName: 'trinh-chieu-lop1',
    exportedAt: new Date().toISOString(),
    classroomData,
    customLessons,
    mistakes,
    teachingSessions,
    audioRecordings: serializedAudios,
  };
}

/**
 * Tải file sao lưu về máy laptop giáo viên
 */
export async function downloadBackupFile(): Promise<string> {
  const pkg = await createFullBackupPackage();
  const jsonString = JSON.stringify(pkg, null, 2);

  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `trinh-chieu-lop1-backup-${dateStr}.json`;

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return fileName;
}

/**
 * Nhập và khôi phục toàn bộ dữ liệu từ chuỗi JSON sao lưu
 */
export async function importFullBackup(
  jsonContent: string
): Promise<{ success: boolean; stats?: BackupImportStats; error?: string }> {
  try {
    const pkg: unknown = JSON.parse(jsonContent);

    if (!pkg || typeof pkg !== 'object') {
      return { success: false, error: 'File sao lưu không đúng định dạng JSON hợp lệ.' };
    }

    const backup = pkg as Partial<FullBackupPackage>;

    if (backup.appName !== 'trinh-chieu-lop1' || backup.version !== 1) {
      return {
        success: false,
        error: 'File sao lưu không tương thích với ứng dụng Trình Chiếu Lớp 1 (phiên bản không khớp).',
      };
    }

    // 1. Khôi phục dữ liệu lớp học
    if (backup.classroomData) {
      getClassroomStore().setData(backup.classroomData);
    }

    // 2. Khôi phục bài học tự soạn
    if (Array.isArray(backup.customLessons)) {
      setCustomLessons(backup.customLessons);
    }

    // 3. Khôi phục danh sách câu hỏi hay sai
    if (Array.isArray(backup.mistakes)) {
      getMistakeTracker().setMistakes(backup.mistakes);
    }

    // 4. Khôi phục kịch bản buổi dạy
    if (Array.isArray(backup.teachingSessions)) {
      setCustomSessions(backup.teachingSessions);
    }

    // 5. Khôi phục các file ghi âm vào IndexedDB
    let restoredAudioCount = 0;
    if (Array.isArray(backup.audioRecordings)) {
      for (const rec of backup.audioRecordings) {
        try {
          if (rec.base64Data && rec.id) {
            const blob = base64ToBlob(rec.base64Data, rec.mimeType || 'audio/webm');
            const entry: AudioRecordEntry = {
              id: rec.id,
              blob,
              mimeType: rec.mimeType || 'audio/webm',
              durationMs: rec.durationMs || 0,
              createdAt: rec.createdAt || Date.now(),
            };
            await saveRawAudioEntry(entry);
            restoredAudioCount++;
          }
        } catch (e) {
          console.warn(`[BackupManager] Failed to restore audio ${rec.id}:`, e);
        }
      }
    }

    const stats: BackupImportStats = {
      studentsCount: backup.classroomData?.students?.length || 0,
      lessonsCount: backup.customLessons?.length || 0,
      mistakesCount: backup.mistakes?.length || 0,
      sessionsCount: backup.teachingSessions?.length || 0,
      audioCount: restoredAudioCount,
    };

    return { success: true, stats };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { success: false, error: `Lỗi đọc file sao lưu: ${msg}` };
  }
}
