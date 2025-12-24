import { useState, useEffect } from 'react';
import { QuestionCard } from './QuestionCard';
import { Results } from './Results';
import { useQuiz } from '../hooks/useQuiz';
import { createSheetsService } from '../services';
import { getQuizParams } from '../utils';
import type { QuizTopic } from '../types/quiz';

export const Quiz = () => {
  const [topic, setTopic] = useState<QuizTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quiz = useQuiz(topic);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const params = getQuizParams();
        if (!params) {
          setError('Missing spreadsheetId or sheet in URL parameters');
          setLoading(false);
          return;
        }

        const service = createSheetsService();
        const data = await service.fetchQuizTopic(params.spreadsheetId, params.sheet);
        setTopic(data);
        document.title = `Quiz: ${data.name}`;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
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
          questions={quiz.shuffledQuestions}
          userAnswers={quiz.userAnswers}
          onRestart={quiz.restart}
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <div className="text-lg text-gray-600">
            Question {quiz.currentQuestionIndex + 1} of {quiz.totalQuestions}
          </div>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
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
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Submit Answer
          </button>
        )}

        {quiz.isAnswered && (
          <button
            onClick={quiz.nextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {quiz.isLastQuestion ? 'View Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};
