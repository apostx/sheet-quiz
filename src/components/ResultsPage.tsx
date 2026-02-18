import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Results } from './Results';
import { createSheetsService } from '../services';
import { shuffleTopicWithSeed, parseQuizHash } from '../utils';
import type { QuizQuestion, QuizOption } from '../types/quiz';

export const ResultsPage = () => {
  const { spreadsheetId, sheetName } = useParams<{ spreadsheetId: string; sheetName: string }>();
  const [searchParams] = useSearchParams();
  const maxParam = searchParams.get('max');
  const navigate = useNavigate();

  const [data, setData] = useState<{
    topicName: string;
    questions: QuizQuestion[];
    userAnswers: Map<number, Set<QuizOption>>;
    score: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSearchString = () => maxParam ? `?max=${maxParam}` : '';

  useEffect(() => {
    const abortController = new AbortController();

    const loadResults = async () => {
      try {
        if (!spreadsheetId || !sheetName) {
          setError('Missing route parameters');
          setLoading(false);
          return;
        }

        const hashState = parseQuizHash(window.location.hash);
        if (!hashState) {
          setError('No quiz results found');
          setLoading(false);
          return;
        }

        const service = createSheetsService();
        const topic = await service.fetchQuizTopic(spreadsheetId, sheetName, abortController.signal);

        const max = maxParam ? parseInt(maxParam, 10) : undefined;
        const shuffledTopic = shuffleTopicWithSeed(topic, hashState.seed, max);
        const questions = shuffledTopic.questions;

        // Map answer indices back to object references and compute score
        const userAnswers = new Map<number, Set<QuizOption>>();
        let score = 0;

        for (const [qIdx, optIndices] of hashState.answers) {
          if (qIdx >= questions.length) continue;
          const question = questions[qIdx];
          const selectedOpts = new Set<QuizOption>();

          for (const optIdx of optIndices) {
            if (optIdx < question.options.length) {
              selectedOpts.add(question.options[optIdx]);
            }
          }

          if (selectedOpts.size > 0) {
            userAnswers.set(qIdx, selectedOpts);

            const isCorrect =
              selectedOpts.size === question.correctOptions.length &&
              question.correctOptions.every(opt => selectedOpts.has(opt));
            if (isCorrect) score++;
          }
        }

        setData({ topicName: shuffledTopic.name, questions, userAnswers, score });
        document.title = `Results: ${shuffledTopic.name}`;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadResults();
    return () => { abortController.abort(); };
  }, [spreadsheetId, sheetName, maxParam]);

  const handleRestart = () => {
    // Navigate back to quiz route without hash — starts fresh
    navigate(`/${spreadsheetId}/${sheetName}${getSearchString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error || 'No results data'}</p>
          </div>
          {spreadsheetId && (
            <Link to={`/${spreadsheetId}${getSearchString()}`} className="block text-center text-blue-600 hover:underline">
              ← Back to Sheet List
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Results
        score={data.score}
        total={data.questions.length}
        topicName={data.topicName}
        questions={data.questions}
        userAnswers={data.userAnswers}
        onRestart={handleRestart}
      />
    </div>
  );
};
