import type { QuizOption } from '../types/quiz';

interface OptionButtonProps {
  option: QuizOption;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  onClick: () => void;
}

export const OptionButton = ({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  onClick,
}: OptionButtonProps) => {
  const getButtonClass = () => {
    const base = 'w-full p-4 text-left rounded-lg border-2 transition-all';

    if (isAnswered) {
      if (isCorrect) {
        return `${base} bg-green-100 border-green-500 text-green-900`;
      }
      if (isSelected) {
        return `${base} bg-red-100 border-red-500 text-red-900`;
      }
      return `${base} bg-gray-100 border-gray-300 text-gray-600`;
    }

    if (isSelected) {
      return `${base} bg-blue-100 border-blue-500 text-blue-900`;
    }

    return `${base} bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50`;
  };

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={getButtonClass()}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium flex-1">{option.response}</div>
        {option.hint && (
          <div className="relative group flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs cursor-help">
              i
            </div>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
              <div className="relative">
                {option.hint}
                <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
