// IndexedDB Student Database Manager
// Stores student records in browser IndexedDB with fallback to localStorage & Supabase Cloud
import type { Student } from './classroom-store';
import {
  syncStudentToSupabase,
  deleteStudentFromSupabaseCloud,
  syncAllStudentsToSupabase,
  fetchStudentsFromSupabase,
} from './supabase-client';

const DB_NAME = 'trinh_chieu_students_db_v1';
const DB_VERSION = 1;
const STORE_NAME = 'students';
const BACKUP_STORAGE_KEY = 'trinh_chieu_classroom_v1';

let dbPromise: Promise<IDBDatabase> | null = null;

function isIndexedDbAvailable(): boolean {
  return typeof indexedDB !== 'undefined';
}

export function getStudentDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (!isIndexedDbAvailable()) {
      reject(new Error('IndexedDB không được hỗ trợ trên môi trường này.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('isAbsent', 'isAbsent', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error(`Lỗi mở IndexedDB: ${request.error?.message || 'Không xác định'}`));
    };
  });

  return dbPromise;
}

/**
 * Đọc toàn bộ danh sách học sinh từ Database (Ưu tiên Supabase Cloud nếu online, fallback IndexedDB)
 */
export async function getStudentsFromDb(): Promise<Student[]> {
  // 1. Thử tải từ Supabase Cloud trước nếu có kết nối
  try {
    const cloudStudents = await fetchStudentsFromSupabase();
    if (cloudStudents && cloudStudents.length > 0) {
      // Lưu lại vào IndexedDB nội bộ làm cache offline
      saveFallbackLocalStorage(cloudStudents);
      return cloudStudents;
    }
  } catch {
    // continue to local
  }

  if (!isIndexedDbAvailable()) {
    return loadFallbackLocalStorage();
  }

  try {
    const db = await getStudentDb();
    return new Promise<Student[]>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result as Student[];
        if (Array.isArray(result) && result.length > 0) {
          resolve(result);
        } else {
          // If empty in IndexedDB, check localStorage
          const fallback = loadFallbackLocalStorage();
          if (fallback.length > 0) {
            // Seed IndexedDB from localStorage
            saveAllStudentsToDb(fallback).catch(() => {});
            resolve(fallback);
          } else {
            resolve([]);
          }
        }
      };

      request.onerror = () => {
        resolve(loadFallbackLocalStorage());
      };
    });
  } catch (e) {
    console.warn('[StudentDB] getStudentsFromDb error:', e);
    return loadFallbackLocalStorage();
  }
}

/**
 * Lưu hoặc cập nhật một học sinh vào Database
 */
export async function saveStudentToDb(student: Student): Promise<void> {
  // Đồng bộ ngầm lên Supabase Cloud
  syncStudentToSupabase(student).catch(() => {});

  if (!isIndexedDbAvailable()) {
    saveFallbackSingle(student);
    return;
  }

  try {
    const db = await getStudentDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put(student);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    // Đồng bộ sang localStorage để dự phòng
    saveFallbackSingle(student);
  } catch (e) {
    console.warn('[StudentDB] saveStudentToDb error:', e);
    saveFallbackSingle(student);
  }
}

/**
 * Lưu toàn bộ danh sách học sinh (Transactional batch)
 */
export async function saveAllStudentsToDb(students: Student[]): Promise<void> {
  // 1. Luôn lưu vào LocalStorage snapshot
  saveFallbackLocalStorage(students);

  // 2. Đồng bộ ngầm lên Supabase Cloud
  syncAllStudentsToSupabase(students).catch(() => {});

  if (!isIndexedDbAvailable()) return;

  try {
    const db = await getStudentDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();

      for (const s of students) {
        store.put(s);
      }

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (e) {
    console.warn('[StudentDB] saveAllStudentsToDb error:', e);
  }
}

/**
 * Xóa một học sinh khỏi Database
 */
export async function deleteStudentFromDb(id: string): Promise<void> {
  // Đồng bộ xóa trên Supabase Cloud
  deleteStudentFromSupabaseCloud(id).catch(() => {});

  if (isIndexedDbAvailable()) {
    try {
      const db = await getStudentDb();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('[StudentDB] deleteStudentFromDb error:', e);
    }
  }

  // Cập nhật fallback localStorage
  const current = loadFallbackLocalStorage().filter((s) => s.id !== id);
  saveFallbackLocalStorage(current);
}

// ==========================================
// FALLBACK LOCALSTORAGE HELPERS
// ==========================================

function loadFallbackLocalStorage(): Student[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.students) ? parsed.students : [];
  } catch {
    return [];
  }
}

function saveFallbackLocalStorage(students: Student[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    let teams = [];
    const raw = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (raw) {
      try {
        teams = JSON.parse(raw).teams || [];
      } catch {
        // ignore
      }
    }
    localStorage.setItem(
      BACKUP_STORAGE_KEY,
      JSON.stringify({
        students,
        teams,
        isCustomized: true, // Đánh dấu giáo viên đã tùy biến, không tự reset về mặc định
      })
    );
  } catch (e) {
    console.warn('[StudentDB] saveFallbackLocalStorage error:', e);
  }
}

function saveFallbackSingle(student: Student): void {
  const list = loadFallbackLocalStorage();
  const idx = list.findIndex((s) => s.id === student.id);
  if (idx >= 0) {
    list[idx] = student;
  } else {
    list.push(student);
  }
  saveFallbackLocalStorage(list);
}
