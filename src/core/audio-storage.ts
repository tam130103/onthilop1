/**
 * IndexedDB Audio Storage Manager
 * Stores teacher microphone recording Blobs in browser IndexedDB.
 * The lesson JSON only stores compact reference strings (e.g. `idb://rec_173030...`),
 * preventing bloat and ensuring offline persistence.
 */

const DB_NAME = 'trinh-chieu-audio-db';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

export interface AudioRecordEntry {
  id: string;
  blob: Blob;
  buffer?: ArrayBuffer;
  mimeType: string;
  durationMs: number;
  createdAt: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('Trình duyệt không hỗ trợ IndexedDB để lưu trữ âm thanh cục bộ.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error(`Lỗi mở cơ sở dữ liệu IndexedDB: ${request.error?.message || 'Không xác định'}`));
    };
  });

  return dbPromise;
}

/**
 * Saves a recorded audio Blob into IndexedDB and returns its reference URI.
 * Throws a clear error if storage fails (e.g. QuotaExceeded or transaction error).
 */
export async function saveAudioBlob(blob: Blob, durationMs: number): Promise<string> {
  if (!blob || blob.size === 0) {
    throw new Error('Dữ liệu âm thanh thu được bị rỗng (0 bytes). Vui lòng kiểm tra lại micro.');
  }

  const id = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  let buffer: ArrayBuffer | undefined;
  try {
    buffer = await blob.arrayBuffer();
  } catch {
    // Fallback if arrayBuffer is unavailable
  }

  const entry: AudioRecordEntry = {
    id,
    blob,
    buffer,
    mimeType: blob.type || 'audio/webm',
    durationMs,
    createdAt: Date.now(),
  };

  try {
    const db = await getDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      transaction.onerror = () => {
        const err = transaction.error;
        if (err && err.name === 'QuotaExceededError') {
          reject(new Error('Bộ nhớ trình duyệt đã đầy (QuotaExceeded). Vui lòng xóa bớt bài giảng hoặc dữ liệu cũ.'));
        } else {
          reject(new Error(`Lỗi lưu âm thanh vào IndexedDB: ${err?.message || 'Transaction thất bại'}`));
        }
      };

      transaction.onabort = () => {
        reject(new Error('Giao dịch lưu âm thanh vào IndexedDB bị hủy bỏ (aborted).'));
      };

      const putRequest = store.put(entry);
      putRequest.onsuccess = () => {
        resolve();
      };
      putRequest.onerror = () => {
        reject(new Error(`Lỗi ghi dữ liệu âm thanh: ${putRequest.error?.message || 'Không thể lưu bản ghi'}`));
      };
    });

    return `idb://${id}`;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Lưu âm thanh thu âm thất bại: ${msg}`);
  }
}

/**
 * Retrieves an audio Blob by its reference URI (`idb://...`).
 */
export async function getAudioBlob(refUri: string): Promise<Blob | null> {
  if (!refUri.startsWith('idb://')) return null;
  const id = refUri.replace('idb://', '');

  try {
    const db = await getDb();
    return await new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const result = getRequest.result as AudioRecordEntry | undefined;
        if (!result) {
          resolve(null);
          return;
        }

        if (result.blob && typeof result.blob.size === 'number' && result.blob.size > 0) {
          resolve(result.blob);
        } else if (result.buffer) {
          resolve(new Blob([result.buffer], { type: result.mimeType || 'audio/webm' }));
        } else {
          resolve(result.blob || null);
        }
      };

      getRequest.onerror = () => {
        reject(new Error(`Lỗi đọc âm thanh từ IndexedDB: ${getRequest.error?.message}`));
      };
    });
  } catch (err) {
    console.warn(`[AudioStorage] Failed to get audio for ${refUri}:`, err);
    return null;
  }
}

/**
 * Creates a playable Object URL for an `idb://` audio reference.
 */
export async function getAudioObjectUrl(refUri: string): Promise<string | null> {
  const blob = await getAudioBlob(refUri);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

/**
 * Deletes an audio recording from IndexedDB.
 */
export async function deleteAudioBlob(refUri: string): Promise<void> {
  if (!refUri.startsWith('idb://')) return;
  const id = refUri.replace('idb://', '');

  try {
    const db = await getDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(new Error(`Lỗi xóa âm thanh: ${req.error?.message}`));
    });
  } catch (err) {
    console.warn(`[AudioStorage] Failed to delete ${refUri}:`, err);
  }
}

/**
 * Lấy toàn bộ danh sách các bản ghi âm để xuất sao lưu toàn diện
 */
export async function getAllAudioRecordings(): Promise<AudioRecordEntry[]> {
  try {
    const db = await getDb();
    return await new Promise<AudioRecordEntry[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const rawList = (req.result || []) as AudioRecordEntry[];
        const normalized = rawList.map((entry) => {
          let b = entry.blob;
          if ((!b || typeof b.size !== 'number') && entry.buffer) {
            b = new Blob([entry.buffer], { type: entry.mimeType || 'audio/webm' });
          }
          return {
            ...entry,
            blob: b,
          };
        });
        resolve(normalized);
      };
      req.onerror = () => reject(new Error(`Lỗi lấy danh sách ghi âm: ${req.error?.message}`));
    });
  } catch (e) {
    console.warn('[AudioStorage] getAllAudioRecordings error:', e);
    return [];
  }
}

/**
 * Ghi đè hoặc thêm một bản ghi âm vào IndexedDB khi nhập từ file sao lưu
 */
export async function saveRawAudioEntry(entry: AudioRecordEntry): Promise<void> {
  const db = await getDb();
  let buffer = entry.buffer;
  if (!buffer && entry.blob) {
    try {
      buffer = await entry.blob.arrayBuffer();
    } catch {
      // fallback
    }
  }

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const req = store.put({
      ...entry,
      buffer,
    });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(new Error(`Lỗi khôi phục ghi âm ${entry.id}: ${req.error?.message}`));
  });
}
