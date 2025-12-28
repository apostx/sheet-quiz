import { describe, it, expect, beforeEach } from 'vitest';
import { getQuizParams } from './url';

describe('getQuizParams', () => {
  beforeEach(() => {
    // Reset URL to clean state
    window.history.pushState({}, '', '/');
  });

  it('returns null when spreadsheetId is missing', () => {
    window.history.pushState({}, '', '/?sheet=Sheet1');
    expect(getQuizParams()).toBeNull();
  });

  it('returns null when sheet is missing', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123');
    expect(getQuizParams()).toBeNull();
  });

  it('returns null when both params are missing', () => {
    window.history.pushState({}, '', '/');
    expect(getQuizParams()).toBeNull();
  });

  it('returns params when both spreadsheetId and sheet are present', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=Sheet1');
    const result = getQuizParams();
    expect(result).toEqual({
      spreadsheetId: 'abc123',
      sheet: 'Sheet1',
      max: undefined,
    });
  });

  it('parses valid max parameter', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=Sheet1&max=10');
    const result = getQuizParams();
    expect(result).toEqual({
      spreadsheetId: 'abc123',
      sheet: 'Sheet1',
      max: 10,
    });
  });

  it('ignores invalid max (non-numeric)', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=Sheet1&max=invalid');
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('ignores zero max', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=Sheet1&max=0');
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('ignores negative max', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=Sheet1&max=-5');
    const result = getQuizParams();
    expect(result?.max).toBeUndefined();
  });

  it('handles URL-encoded sheet names', () => {
    window.history.pushState({}, '', '/?spreadsheetId=abc123&sheet=My%20Sheet');
    const result = getQuizParams();
    expect(result?.sheet).toBe('My Sheet');
  });
});
