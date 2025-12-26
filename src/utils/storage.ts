export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`[Storage] Error reading ${key}:`, error);
    return fallback;
  }
}

export function safeSetItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('[Storage] Quota exceeded');
      alert('Storage full. Please delete some saved items.');
    } else {
      console.error(`[Storage] Error writing ${key}:`, error);
    }
    return false;
  }
}
