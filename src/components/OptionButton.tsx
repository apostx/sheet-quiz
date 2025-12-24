import { useState, useRef, useEffect } from 'react';
import type { QuizOption } from '../types/quiz';

interface OptionButtonProps {
  option: QuizOption;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  isMultiAnswer: boolean;
  onClick: () => void;
}

export const OptionButton = ({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  isMultiAnswer,
  onClick,
}: OptionButtonProps) => {
  const [showHintTooltip, setShowHintTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowHintTooltip(false);
      }
    };

    if (showHintTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showHintTooltip]);

  const getButtonClass = () => {
    const base = 'w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all';

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
        <div className="flex items-center gap-3 flex-1">
          {/* Render checkbox for multi-answer, radio for single-answer */}
          <div className="flex-shrink-0">
            {isMultiAnswer ? (
              // Checkbox
              <div className={`w-6 h-6 sm:w-5 sm:h-5 border-2 rounded flex items-center justify-center ${
                isSelected
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400'
              }`}>
                {isSelected && (
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ) : (
              // Radio button
              <div className={`w-6 h-6 sm:w-5 sm:h-5 border-2 rounded-full flex items-center justify-center ${
                isSelected
                  ? 'border-blue-600'
                  : 'border-gray-400'
              }`}>
                {isSelected && (
                  <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-blue-600" />
                )}
              </div>
            )}
          </div>
          <div className="font-medium text-sm sm:text-base">{option.response}</div>
        </div>
        {option.hint && (
          <div ref={tooltipRef} className="relative group flex-shrink-0">
            <div
              className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowHintTooltip(!showHintTooltip);
              }}
            >
              i
            </div>
            <div className={`absolute bottom-full right-0 mb-2 w-56 sm:w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 ${showHintTooltip ? 'block' : 'hidden group-hover:block'}`}>
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
