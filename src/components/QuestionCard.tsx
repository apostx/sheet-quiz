import type { QuizQuestion, QuizOption } from '../types/quiz';
import { OptionButton } from './OptionButton';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOption: QuizOption | null;
  isAnswered: boolean;
  onSelectOption: (option: QuizOption) => void;
}

export const QuestionCard = ({
  question,
  selectedOption,
  isAnswered,
  onSelectOption,
}: QuestionCardProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start gap-3 mb-6">
          <h2 className="text-2xl font-bold flex-1">{question.question}</h2>
          {question.note && (
            <div className="relative group flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-help">
                ?
              </div>
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                <div className="relative">
                  {question.note}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              isSelected={selectedOption === option}
              isAnswered={isAnswered}
              isCorrect={option === question.correctOption}
              onClick={() => onSelectOption(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
