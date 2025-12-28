import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getQuizParams } from './url';

// Mock window.location
const mockLocation = { search: '' };
vi.stubGlobal('window', { location: mockLocation });

describe('getQuizParams', () => {
  beforeEach(() => {
    mockLocation.search = '';
  });

  it('returns null when spreadsheetId is missing', () => {
    mockLocation.search = '?sheet=Sheet1';
    expect(getQuizParams()).toBeNull();
  });

  it('returns null when sheet is missing', () => {
    mockLocation.search = '?spreadsheetId=abc123';
    expect(getQuizParams()).toBeNull();
  });

  it('returns null when both params are missing', () => {
    mockLocation.search = '';
    expect(getQuizParams()).toBeNull();
  });

  it('returns params when both spreadsheetId and sheet are present', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=Sheet1';
    const result = getQuizParams();
    expect(result).toEqual({
      spreadsheetId: 'abc123',
      sheet: 'Sheet1',
      max: undefined,
    });
  });

  it('parses valid max parameter', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=Sheet1&max=10';
    const result = getQuizParams();
    expect(result).toEqual({
      spreadsheetId: 'abc123',
      sheet: 'Sheet1',
      max: 10,
    });
  });

  it('ignores invalid max (non-numeric)', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=Sheet1&max=invalid';
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('ignores zero max', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=Sheet1&max=0';
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('ignores negative max', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=Sheet1&max=-5';
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('handles URL-encoded sheet names', () => {
    mockLocation.search = '?spreadsheetId=abc123&sheet=My%20Sheet';
    const result = getQuizParams();
    expect(result?.sheet).toBe('My Sheet');
  });
});
