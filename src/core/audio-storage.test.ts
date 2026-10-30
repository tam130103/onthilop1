import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import {
  saveAudioBlob,
  getAudioBlob,
  getAudioObjectUrl,
  deleteAudioBlob,
} from './audio-storage';

describe('audio-storage (IndexedDB audio blobs)', () => {
  it('rejects empty blobs with clear error', async () => {
    const emptyBlob = new Blob([], { type: 'audio/webm' });
    await expect(saveAudioBlob(emptyBlob, 0)).rejects.toThrow(
      'Dữ liệu âm thanh thu được bị rỗng'
    );
  });

  it('saves non-empty blob and returns idb:// reference', async () => {
    const fakeData = new Uint8Array([1, 2, 3, 4, 5]);
    const blob = new Blob([fakeData], { type: 'audio/webm' });

    const refUri = await saveAudioBlob(blob, 3500);
    expect(refUri.startsWith('idb://rec_')).toBe(true);

    // Retrieve blob
    const retrieved = await getAudioBlob(refUri);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.size).toBe(5);

    // Delete
    await deleteAudioBlob(refUri);
    const afterDelete = await getAudioBlob(refUri);
    expect(afterDelete).toBeNull();
  });

  it('returns null for non-idb URI', async () => {
    const result = await getAudioBlob('/media/tts/test.mp3');
    expect(result).toBeNull();
  });
});
