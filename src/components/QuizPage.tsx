import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { QuestionCard } from './QuestionCard';
import { Results } from './Results';
import { useQuiz } from '../hooks/useQuiz';
import type { QuizInitialState } from '../hooks/useQuiz';
import { useSpreadsheets } from '../hooks/useSpreadsheets';
import { useSheets } from '../hooks/useSheets';
import { createSheetsService } from '../services';
import { createSeededRandom, shuffleArray, encodeQuizHash, parseQuizHash } from '../utils';
import type { QuizTopic } from '../types/quiz';

const generateSeed = () => Math.floor(Math.random() * 0x7FFFFFFF);

/** Apply seeded shuffle to questions (max selection) and all option orders */
const shuffleTopicWithSeed = (topic: QuizTopic, seed: number, max?: number): QuizTopic => {
  const random = createSeededRandom(seed);

  let questions = topic.questions;
  if (max && max > 0 && max < questions.length) {
    questions = shuffleArray(questions, random).slice(0, max);
  }

  // Shuffle options for each question using the same PRNG sequence
  const shuffledQuestions = questions.map(question => ({
    ...question,
    options: shuffleArray(question.options, random),
  }));

  return { ...topic, questions: shuffledQuestions };
};

export const QuizPage = () => {
  const { spreadsheetId, sheetName } = useParams<{ spreadsheetId: string; sheetName: string }>();
  const [searchParams] = useSearchParams();
  const maxParam = searchParams.get('max');

  const getSearchString = () => maxParam ? `?max=${maxParam}` : '';

  const [topic, setTopic] = useState<QuizTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialState, setInitialState] = useState<QuizInitialState | undefined>();
  const seedRef = useRef<number>(0);

  const quiz = useQuiz(topic, initialState);

  // Auto-save to localStorage when quiz loads
  const { spreadsheets, add: addSpreadsheet } = useSpreadsheets();
  const { sheets, add: addSheet } = useSheets(spreadsheetId || '');

  useEffect(() => {
    const abortController = new AbortController();

    const loadQuiz = async () => {
      try {
        if (!spreadsheetId || !sheetName) {
          setError('Missing route parameters');
          setLoading(false);
          return;
        }

        // Check hash for existing state
        const hashState = parseQuizHash(window.location.hash);
        const seed = hashState?.seed ?? generateSeed();
        seedRef.current = seed;

        const service = createSheetsService();
        const data = await service.fetchQuizTopic(spreadsheetId, sheetName, abortController.signal);

        const max = maxParam ? parseInt(maxParam, 10) : undefined;
        const shuffledTopic = shuffleTopicWithSeed(data, seed, max);

        // If restoring from hash, build initial state
        if (hashState) {
          setInitialState({
            currentQuestionIndex: Math.min(hashState.currentQuestionIndex, shuffledTopic.questions.length - 1),
            answers: hashState.answers,
            currentSelections: hashState.currentSelections,
            showResult: hashState.showResult,
          });
        }

        setTopic(shuffledTopic);
        document.title = `Quiz: ${data.name}`;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadQuiz();
    return () => { abortController.abort(); };
  }, [spreadsheetId, sheetName, maxParam]);

  // Auto-save spreadsheet and sheet to localStorage when quiz loads successfully
  useEffect(() => {
    if (!topic || !spreadsheetId || !sheetName) return;

    if (!spreadsheets.some((s) => s.id === spreadsheetId)) {
      addSpreadsheet(spreadsheetId);
    }
    if (!sheets.some((s) => s.name === sheetName)) {
      addSheet(sheetName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  // Sync quiz state to URL hash
  useEffect(() => {
    if (!topic || !seedRef.current) return;

    const questions = topic.questions;

    // Convert userAnswers (object refs) back to option indices
    const answers = new Map<number, Set<number>>();
    for (const [qIdx, selectedOpts] of quiz.userAnswers) {
      if (qIdx >= questions.length) continue;
      const optIndices = new Set<number>();
      for (const opt of selectedOpts) {
        const idx = questions[qIdx].options.indexOf(opt);
        if (idx >= 0) optIndices.add(idx);
      }
      if (optIndices.size > 0) answers.set(qIdx, optIndices);
    }

    // Convert current selections to option indices
    const currentSelections = new Set<number>();
    const currentQ = questions[quiz.currentQuestionIndex];
    if (currentQ && !quiz.isAnswered) {
      for (const opt of quiz.selectedOptions) {
        const idx = currentQ.options.indexOf(opt);
        if (idx >= 0) currentSelections.add(idx);
      }
    }

    const hash = encodeQuizHash({
      seed: seedRef.current,
      currentQuestionIndex: quiz.currentQuestionIndex,
      answers,
      currentSelections,
      showResult: quiz.showResult,
    });

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
  }, [topic, quiz.currentQuestionIndex, quiz.selectedOptions, quiz.userAnswers, quiz.isAnswered, quiz.showResult]);

  // Handle restart: new seed, new shuffle
  const handleRestart = useCallback(() => {
    if (!topic) return;

    const newSeed = generateSeed();
    seedRef.current = newSeed;

    // Re-fetch isn't needed — re-shuffle the original data
    // But we don't have the original unsorted data anymore.
    // Simplest: reload the page without hash to get a fresh quiz
    window.location.hash = '';
    window.location.reload();
  }, [topic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
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
            <Link
              to={`/${spreadsheetId}${getSearchString()}`}
              className="block text-center text-blue-600 hover:underline"
            >
              ← Back to Sheet List
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!topic) {
    return null;
  }

  if (quiz.showResult) {
    return (
      <div className="min-h-screen p-4 bg-gray-100">
        <Results
          score={quiz.score}
          total={quiz.totalQuestions}
          topicName={topic.name}
          questions={quiz.questions}
          userAnswers={quiz.userAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  if (!quiz.currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No questions available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 py-8">
      <div className="max-w-4xl mx-auto mb-6">
        {spreadsheetId && (
          <nav className="mb-4">
            <Link to={`/${spreadsheetId}${getSearchString()}`} className="text-blue-600 hover:underline text-sm sm:text-base">
              ← Back to Sheet List
            </Link>
          </nav>
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{topic.name}</h1>
          <div className="text-sm sm:text-base md:text-lg text-gray-600">
            Question {quiz.currentQuestionIndex + 1} of {quiz.totalQuestions}
          </div>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all"
            style={{
              width: `${((quiz.currentQuestionIndex + 1) / quiz.totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      <QuestionCard
        question={quiz.currentQuestion}
        selectedOptions={quiz.selectedOptions}
        isAnswered={quiz.isAnswered}
        onSelectOption={quiz.selectOption}
      />

      <div className="max-w-3xl mx-auto mt-6 flex justify-end">
        {!quiz.isAnswered && (
          <button
            onClick={quiz.submitAnswer}
            disabled={quiz.selectedOptions.size === 0}
            className="px-4 py-3 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Submit Answer
          </button>
        )}

        {quiz.isAnswered && (
          <button
            onClick={quiz.nextQuestion}
            className="px-4 py-3 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {quiz.isLastQuestion ? 'View Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};
