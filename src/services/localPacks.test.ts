import { describe, it, expect, beforeEach } from 'vitest';
import {
  findPack,
  isLocalSpreadsheet,
  localSheetName,
  localSpreadsheetId,
  removeLocalSpreadsheet,
  removePack,
  savePack,
  spreadsheetLabel,
} from './localPacks';
import { SheetsService } from './sheets';

const pack = (sheetName: string, csv = 'Question?,,1,Right,,Wrong,') => ({
  spreadsheetId: '~wallet-demo',
  sheetName,
  datasetName: 'Multi-currency wallet',
  csv,
  receivedAt: '2026-11-03T10:00:00.000Z',
});

describe('localPacks', () => {
  beforeEach(() => localStorage.clear());

  it('names datasets with a prefix that Google Sheets IDs never have', () => {
    expect(localSpreadsheetId('wallet-demo')).toBe('~wallet-demo');
    expect(localSpreadsheetId('Café Bank!')).toBe('~cafe-bank');
    expect(localSpreadsheetId('!!!')).toBe('~quizzes');
    expect(isLocalSpreadsheet('~wallet-demo')).toBe(true);
    expect(isLocalSpreadsheet('1nFxVuAugEsxKsaQWrVxkHQ5dSYgZL0jbQB57Sovsndk')).toBe(false);
  });

  it('turns titles into sheet names a route can hold', () => {
    expect(localSheetName('Payments · Advanced')).toBe('Payments · Advanced');
    expect(localSheetName('In/out? #1 100%')).toBe('In out 1 100');
    expect(localSheetName('  ')).toBe('Quiz');
  });

  it('replaces a quiz of the same dataset and title', () => {
    savePack(pack('All terms', 'old'));
    savePack(pack('All terms', 'new'));
    savePack(pack('Payments'));
    expect(findPack('~wallet-demo', 'All terms')?.csv).toBe('new');
    expect(findPack('~wallet-demo', 'Payments')).toBeDefined();
  });

  it('removes one quiz or all quizzes of a dataset', () => {
    savePack(pack('All terms'));
    savePack(pack('Payments'));
    removePack('~wallet-demo', 'All terms');
    expect(findPack('~wallet-demo', 'All terms')).toBeUndefined();
    removeLocalSpreadsheet('~wallet-demo');
    expect(findPack('~wallet-demo', 'Payments')).toBeUndefined();
  });

  it("shows the dataset's name instead of the ID", () => {
    savePack(pack('All terms'));
    expect(spreadsheetLabel('~wallet-demo')).toBe('Multi-currency wallet');
    expect(spreadsheetLabel('~unknown')).toBe('~unknown');
    expect(spreadsheetLabel('abc123')).toBe('abc123');
  });

  it('serves saved quizzes without Google Sheets, with unsafe markup removed', async () => {
    savePack(pack('All terms', '"What is <b>this</b>?<script>alert(1)</script>",Note,1,Right,,Wrong,'));
    const topic = await new SheetsService().fetchQuizTopic('~wallet-demo', 'All terms');
    expect(topic.name).toBe('All terms');
    expect(topic.questions[0].question).toBe('What is <b>this</b>?');
    await expect(new SheetsService().fetchQuizTopic('~wallet-demo', 'Gone')).rejects.toThrow(
      'This quiz is no longer saved in this browser.'
    );
  });
});
