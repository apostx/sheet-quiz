import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SheetsService } from './sheets';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('SheetsService', () => {
  let service: SheetsService;

  beforeEach(() => {
    service = new SheetsService();
    vi.clearAllMocks();
  });

  describe('fetchQuizTopic', () => {
    it('throws on non-ok response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(service.fetchQuizTopic('id', 'sheet')).rejects.toThrow(
        'Failed to fetch sheet data (404): Not Found'
      );
    });

    it('parses simple CSV with single-answer questions', async () => {
      const csv = `"What is 2+2?","A math question","1","4","Correct!","3","Wrong"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.name).toBe('sheet');
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].question).toBe('What is 2+2?');
      expect(result.questions[0].note).toBe('A math question');
      expect(result.questions[0].options).toHaveLength(2);
      expect(result.questions[0].isMultiAnswer).toBe(false);
      expect(result.questions[0].correctOptions).toHaveLength(1);
      expect(result.questions[0].correctOptions[0].response).toBe('4');
    });

    it('parses multi-answer questions with bracket syntax', async () => {
      const csv = `"Select all fruits","","[1,2]","Apple","","Banana","","Car",""`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions[0].isMultiAnswer).toBe(true);
      expect(result.questions[0].correctOptions).toHaveLength(2);
      expect(result.questions[0].correctOptions[0].response).toBe('Apple');
      expect(result.questions[0].correctOptions[1].response).toBe('Banana');
    });

    it('defaults to first option when correctIndices is empty', async () => {
      const csv = `"Question","","","Option A","","Option B",""`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions[0].correctOptions).toHaveLength(1);
      expect(result.questions[0].correctOptions[0].response).toBe('Option A');
      expect(result.questions[0].isMultiAnswer).toBe(false);
    });

    it('handles quoted fields with commas', async () => {
      const csv = `"Question, with comma","Note, also","1","Option A","Hint, here"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions[0].question).toBe('Question, with comma');
      expect(result.questions[0].note).toBe('Note, also');
      expect(result.questions[0].options[0].hint).toBe('Hint, here');
    });

    it('handles escaped quotes in fields', async () => {
      // CSV with escaped quotes and enough columns (question, note, correctIndex, option, hint)
      const csv = `"He said ""Hello""","Note","1","Option ""A""","Hint"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].question).toBe('He said "Hello"');
      expect(result.questions[0].options[0].response).toBe('Option "A"');
    });

    it('skips rows with less than 5 columns', async () => {
      const csv = `"Short row","only","three"
"Valid question","note","1","Option A","Hint"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].question).toBe('Valid question');
    });

    it('skips rows without a question', async () => {
      const csv = `"","note","1","Option A","Hint"
"Valid question","note","1","Option A","Hint"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(1);
    });

    it('skips rows without options', async () => {
      const csv = `"Question","note","1","","","",""`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(0);
    });

    it('handles multiple questions', async () => {
      const csv = `"Q1","","1","A","","B",""
"Q2","Note2","2","X","","Y",""`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(2);
      expect(result.questions[0].question).toBe('Q1');
      expect(result.questions[0].correctOptions[0].response).toBe('A');
      expect(result.questions[1].question).toBe('Q2');
      expect(result.questions[1].correctOptions[0].response).toBe('Y');
    });

    it('skips empty lines', async () => {
      // Each row needs at least 5 columns: question, note, correctIndex, option, hint
      const csv = `"Q1","Note1","1","A","Hint1"

"Q2","Note2","1","B","Hint2"`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      expect(result.questions).toHaveLength(2);
      expect(result.questions[0].question).toBe('Q1');
      expect(result.questions[1].question).toBe('Q2');
    });

    it('handles out-of-bounds indices gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const csv = `"Question","","5","A","","B",""`;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(csv),
      });

      const result = await service.fetchQuizTopic('id', 'sheet');

      // Falls back to first option
      expect(result.questions[0].correctOptions[0].response).toBe('A');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('uses correct URL format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(''),
      });

      await service.fetchQuizTopic('spreadsheet-id', 'My Sheet');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://docs.google.com/spreadsheets/d/spreadsheet-id/gviz/tq?tqx=out:csv&sheet=My%20Sheet&headers=0',
        { signal: undefined }
      );
    });

    it('passes abort signal to fetch', async () => {
      const controller = new AbortController();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(''),
      });

      await service.fetchQuizTopic('id', 'sheet', controller.signal);

      expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
        signal: controller.signal,
      });
    });
  });
});
