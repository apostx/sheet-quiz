import { describe, it, expect, vi, beforeEach } from 'vitest';
import { encodeShareData, decodeShareData, type ShareData } from './share';

describe('encodeShareData', () => {
  it('encodes valid share data to URL-safe base64', () => {
    const data: ShareData = {
      version: 1,
      spreadsheets: [{ id: 'abc123', order: 0 }],
    };
    const encoded = encodeShareData(data);
    expect(encoded).toBeTruthy();
    // Should not contain URL-unsafe characters
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');
  });

  it('produces decodable output', () => {
    const data: ShareData = {
      version: 1,
      spreadsheets: [{ id: 'test', order: 1 }],
      sheets: [{ spreadsheetId: 'test', name: 'Sheet1', order: 0 }],
    };
    const encoded = encodeShareData(data);
    const decoded = decodeShareData(encoded);
    expect(decoded).toEqual(data);
  });

  it('returns empty string on encoding error', () => {
    // Create circular reference that can't be stringified
    const circular: Record<string, unknown> = { version: 1 };
    circular.self = circular;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = encodeShareData(circular as unknown as ShareData);
    expect(result).toBe('');
    consoleSpy.mockRestore();
  });
});

describe('decodeShareData', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('decodes valid URL-safe base64', () => {
    const data: ShareData = {
      version: 1,
      spreadsheets: [{ id: 'abc123', order: 0 }],
    };
    const encoded = encodeShareData(data);
    const decoded = decodeShareData(encoded);
    expect(decoded).toEqual(data);
  });

  it('handles data with special characters', () => {
    const data: ShareData = {
      version: 1,
      spreadsheets: [{ id: 'abc+/=123', order: 0 }],
    };
    const encoded = encodeShareData(data);
    const decoded = decodeShareData(encoded);
    expect(decoded).toEqual(data);
  });

  it('returns null for invalid base64', () => {
    const result = decodeShareData('!!!invalid!!!');
    expect(result).toBeNull();
  });

  it('returns null for valid base64 but invalid JSON', () => {
    // btoa('not json') = 'bm90IGpzb24='
    const encoded = 'bm90IGpzb24';
    const result = decodeShareData(encoded);
    expect(result).toBeNull();
  });

  it('returns null when version is missing', () => {
    const invalidData = { spreadsheets: [] };
    const encoded = btoa(JSON.stringify(invalidData)).replace(/=/g, '');
    const result = decodeShareData(encoded);
    expect(result).toBeNull();
  });

  it('returns null when spreadsheets is not an array', () => {
    const invalidData = { version: 1, spreadsheets: 'not an array' };
    const encoded = btoa(JSON.stringify(invalidData)).replace(/=/g, '');
    const result = decodeShareData(encoded);
    expect(result).toBeNull();
  });

  it('returns null when sheets is not an array', () => {
    const invalidData = { version: 1, sheets: 'not an array' };
    const encoded = btoa(JSON.stringify(invalidData)).replace(/=/g, '');
    const result = decodeShareData(encoded);
    expect(result).toBeNull();
  });

  it('accepts data with only version field', () => {
    const data: ShareData = { version: 1 };
    const encoded = encodeShareData(data);
    const decoded = decodeShareData(encoded);
    expect(decoded).toEqual(data);
  });

  it('handles empty arrays', () => {
    const data: ShareData = {
      version: 1,
      spreadsheets: [],
      sheets: [],
    };
    const encoded = encodeShareData(data);
    const decoded = decodeShareData(encoded);
    expect(decoded).toEqual(data);
  });
});
