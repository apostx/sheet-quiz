import type { QuizQuestion, QuizOption } from '../types/quiz';

interface ResultsProps {
  score: number;
  total: number;
  topicName: string;
  questions: QuizQuestion[];
  userAnswers: Map<number, Set<QuizOption>>;
  onRestart: () => void;
}

export const Results = ({ score, total, topicName, questions, userAnswers, onRestart }: ResultsProps) => {
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return 'Perfect!';
    if (percentage >= 80) return 'Great job!';
    if (percentage >= 60) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{topicName}</h2>
        <p className="text-lg sm:text-xl mb-6 text-center">{getMessage()}</p>

        <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-600 text-center">
          {score} / {total}
        </div>

        <div className="text-xl sm:text-2xl mb-8 text-gray-600 text-center">{percentage}%</div>

        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-4 py-3 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Review</h3>
        {questions.map((question, index) => {
          const userAnswerSet = userAnswers.get(index) || new Set();

          // Check if answer is correct (exact match for multi-answer)
          const isCorrect =
            userAnswerSet.size === question.correctOptions.length &&
            question.correctOptions.every(opt => userAnswerSet.has(opt));

          return (
            <div key={`q-${index}-${question.question.slice(0, 20)}`} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base sm:text-lg mb-1">Question {index + 1}</h4>
                  <p className="text-gray-800 text-sm sm:text-base">{question.question}</p>
                  {question.note && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 italic">{question.note}</p>
                  )}
                </div>
              </div>

              <div className="ml-11 space-y-2">
                {question.options.map((option, optIndex) => {
                  const isUserAnswer = userAnswerSet.has(option);
                  const isCorrectAnswer = question.correctOptions.includes(option);

                  let bgClass = 'bg-gray-50';
                  let label = '';

                  if (isCorrectAnswer && isUserAnswer) {
                    // Correctly selected
                    bgClass = 'bg-green-100 border-2 border-green-500';
                    label = '✓ Correct';
                  } else if (isCorrectAnswer && !isUserAnswer) {
                    // Missed correct answer
                    bgClass = 'bg-green-100 border-2 border-green-500';
                    label = '✓ Correct (not selected)';
                  } else if (!isCorrectAnswer && isUserAnswer) {
                    // Incorrectly selected
                    bgClass = 'bg-red-100 border-2 border-red-500';
                    label = '✗ Your answer (incorrect)';
                  }

                  return (
                    <div key={`opt-${optIndex}-${option.response.slice(0, 15)}`} className={`p-3 rounded ${bgClass}`}>
                      <div className="flex items-center gap-2">
                        {label && (
                          <span className={`font-bold ${isCorrectAnswer ? 'text-green-700' : 'text-red-700'}`}>
                            {label}:
                          </span>
                        )}
                        <span className={label ? 'font-medium' : ''}>
                          {option.response}
                        </span>
                      </div>
                      {option.hint && (isCorrectAnswer || isUserAnswer) && (
                        <div className="text-sm mt-1 text-gray-600">{option.hint}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
