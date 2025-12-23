import type { QuizQuestion, QuizOption } from '../types/quiz';

interface ResultsProps {
  score: number;
  total: number;
  topicName: string;
  questions: QuizQuestion[];
  userAnswers: Map<number, QuizOption>;
  onRestart: () => void;
}

export const Results = ({ score, total, topicName, questions, userAnswers, onRestart }: ResultsProps) => {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return 'Perfect!';
    if (percentage >= 80) return 'Great job!';
    if (percentage >= 60) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{topicName}</h2>
        <p className="text-xl mb-6 text-center">{getMessage()}</p>

        <div className="text-6xl font-bold mb-6 text-blue-600 text-center">
          {score} / {total}
        </div>

        <div className="text-2xl mb-8 text-gray-600 text-center">{percentage}%</div>

        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold mb-4">Review</h3>
        {questions.map((question, index) => {
          const userAnswer = userAnswers.get(index);
          const isCorrect = userAnswer === question.correctOption;

          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">Question {index + 1}</h4>
                  <p className="text-gray-800">{question.question}</p>
                  {question.note && (
                    <p className="text-gray-600 text-sm mt-2 italic">{question.note}</p>
                  )}
                </div>
              </div>

              <div className="ml-11 space-y-2">
                {question.options.map((option, optIndex) => {
                  const isUserAnswer = option === userAnswer;
                  const isCorrectAnswer = option === question.correctOption;

                  let bgClass = 'bg-gray-50';
                  if (isCorrectAnswer) {
                    bgClass = 'bg-green-100 border-2 border-green-500';
                  } else if (isUserAnswer && !isCorrect) {
                    bgClass = 'bg-red-100 border-2 border-red-500';
                  }

                  return (
                    <div key={optIndex} className={`p-3 rounded ${bgClass}`}>
                      <div className="flex items-center gap-2">
                        {isCorrectAnswer && <span className="text-green-700 font-bold">✓ Correct:</span>}
                        {isUserAnswer && !isCorrect && <span className="text-red-700 font-bold">Your answer:</span>}
                        <span className={isCorrectAnswer || (isUserAnswer && !isCorrect) ? 'font-medium' : ''}>
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
