import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createSheetsService } from '../services';
import { HtmlContent } from './HtmlContent';
import type { QuizTopic } from '../types/quiz';

export const SearchPage = () => {
  const { spreadsheetId, sheetName } = useParams<{ spreadsheetId: string; sheetName: string }>();

  const [topic, setTopic] = useState<QuizTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        if (!spreadsheetId || !sheetName) {
          setError('Missing route parameters');
          setLoading(false);
          return;
        }

        const service = createSheetsService();
        const data = await service.fetchQuizTopic(spreadsheetId, sheetName, abortController.signal);
        setTopic(data);
        document.title = `Search: ${data.name}`;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { abortController.abort(); };
  }, [spreadsheetId, sheetName]);

  const filteredQuestions = useMemo(() => {
    if (!topic) return [];
    if (!search.trim()) return topic.questions.map((q, i) => ({ question: q, index: i }));

    const term = search.toLowerCase();
    return topic.questions
      .map((q, i) => ({ question: q, index: i }))
      .filter(({ question }) =>
        question.question.toLowerCase().includes(term) ||
        question.correctOptions.some(opt => opt.response.toLowerCase().includes(term))
      );
  }, [topic, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          {spreadsheetId && (
            <Link to={`/${spreadsheetId}`} className="block text-center text-blue-600 hover:underline">
              ← Back to Sheet List
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!topic) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {spreadsheetId && (
          <nav className="mb-4">
            <Link to={`/${spreadsheetId}`} className="text-blue-600 hover:underline text-sm sm:text-base">
              ← Back to Sheet List
            </Link>
          </nav>
        )}

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{topic.name}</h1>

        <div className="sticky top-0 z-10 bg-gray-100 pb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions and answers..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
          <div className="text-sm text-gray-500 mt-2">
            {filteredQuestions.length} of {topic.questions.length} questions
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map(({ question, index }) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-sm text-gray-400 font-mono mt-1">#{index + 1}</span>
                <h2 className="text-base sm:text-lg font-semibold flex-1">
                  <HtmlContent html={question.question} variant="light" />
                </h2>
                {question.isMultiAnswer && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex-shrink-0">
                    Multi
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {question.correctOptions.map((option, optIdx) => (
                  <div
                    key={optIdx}
                    className="flex items-start gap-2 px-3 py-2 rounded text-sm sm:text-base bg-green-50 border border-green-300 text-green-900"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                    <span className="flex-1">
                      <HtmlContent html={option.response} variant="light" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
