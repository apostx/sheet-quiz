import type { StoredSpreadsheet, StoredSheet } from '../types/storage';

export interface ShareData {
  version: 1;
  spreadsheets?: StoredSpreadsheet[];
  sheets?: StoredSheet[];
}

/**
 * Encode share data to URL-safe base64 string
 */
export function encodeShareData(data: ShareData): string {
  try {
    const json = JSON.stringify(data);
    const base64 = btoa(json);
    // Make URL-safe: replace + with -, / with _, remove = padding
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('[Share] Failed to encode data:', error);
    return '';
  }
}

/**
 * Decode base64 string back to ShareData
 * Returns null if decoding fails or data is invalid
 */
export function decodeShareData(encoded: string): ShareData | null {
  try {
    // Restore base64 format: - to +, _ to /, add = padding
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const json = atob(base64);
    const data = JSON.parse(json) as unknown;

    // Validate structure
    if (!isValidShareData(data)) {
      console.error('[Share] Invalid share data structure');
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Share] Failed to decode data:', error);
    return null;
  }
}

/**
 * Type guard to validate ShareData structure
 */
function isValidShareData(data: unknown): data is ShareData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const shareData = data as Partial<ShareData>;

  // Must have version field
  if (typeof shareData.version !== 'number') {
    return false;
  }

  // Spreadsheets must be array if present
  if (shareData.spreadsheets !== undefined && !Array.isArray(shareData.spreadsheets)) {
    return false;
  }

  // Sheets must be array if present
  if (shareData.sheets !== undefined && !Array.isArray(shareData.sheets)) {
    return false;
  }

  return true;
}

/**
 * Copy text to clipboard with fallback for older browsers
 * Returns true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first (requires HTTPS)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('[Clipboard] API failed, trying fallback:', error);
    }
  }

  // Fallback for older browsers or HTTP
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (error) {
    console.error('[Clipboard] Fallback failed:', error);
    return false;
  }
}

/**
 * Generate shareable URL with encoded data
 */
export function generateShareUrl(data: ShareData): string {
  const encoded = encodeShareData(data);
  if (!encoded) {
    return '';
  }

  const url = new URL(window.location.href);
  url.searchParams.set('import', encoded);
  return url.toString();
}
