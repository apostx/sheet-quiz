import { describe, it, expect } from 'vitest';
import { readExportMessage } from './receive';

const message = {
  type: 'domain-map:export',
  version: 1,
  format: 'quiz',
  dataset: { id: 'wallet-demo', name: 'Multi-currency wallet' },
  title: 'All terms',
  csv: 'Which term means this?,,1,Ledger,,Wallet,',
};

describe('readExportMessage', () => {
  it('reads an export', () => {
    expect(readExportMessage(message)).toEqual(message);
  });

  it('ignores messages of other kinds', () => {
    expect(readExportMessage('hello')).toBeNull();
    expect(readExportMessage(null)).toBeNull();
    expect(readExportMessage({ type: 'something-else' })).toBeNull();
  });

  it('refuses other versions and formats with a reason', () => {
    expect(readExportMessage({ ...message, version: 2 })).toEqual({ reason: 'This app reads version 1 of the export.' });
    expect(readExportMessage({ ...message, format: 'flashcards' })).toEqual({ reason: 'This app reads quizzes, not flashcards.' });
  });

  it('refuses incomplete exports', () => {
    expect(readExportMessage({ ...message, dataset: undefined })).toEqual({ reason: 'The export is incomplete.' });
    expect(readExportMessage({ ...message, title: ' ' })).toEqual({ reason: 'The export is incomplete.' });
    expect(readExportMessage({ ...message, csv: 42 })).toEqual({ reason: 'The export is incomplete.' });
  });

  it('refuses exports too large to keep', () => {
    expect(readExportMessage({ ...message, csv: 'x'.repeat(4_000_001) })).toEqual({
      reason: 'The quiz is too large to keep in this browser.',
    });
  });
});
