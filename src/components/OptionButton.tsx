import { useState, useRef, useCallback, useEffect } from 'react';
import type { QuizOption } from '../types/quiz';
import { useClickOutside } from '../hooks/useClickOutside';
import { HtmlContent } from './HtmlContent';

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
  const [isOpen, setIsOpen] = useState(false);
  const isLockedRef = useRef(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const closeTooltip = useCallback(() => {
    setIsOpen(false);
    isLockedRef.current = false;
  }, []);
  useClickOutside(tooltipRef, isOpen, closeTooltip);

  const resetScroll = useCallback(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTop = 0;
    }
  }, []);

  // Reset scroll position when tooltip opens
  useEffect(() => {
    if (isOpen) {
      resetScroll();
    }
  }, [isOpen, resetScroll]);

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
      className={`${getButtonClass()} ${isAnswered ? 'pointer-events-none' : ''}`}
      role={isMultiAnswer ? 'checkbox' : 'radio'}
      aria-checked={isSelected}
      aria-disabled={isAnswered}
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
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <div
            ref={tooltipRef}
            className="relative flex-shrink-0 pointer-events-auto"
            onMouseEnter={() => {
              if (!isOpen) {
                resetScroll();
                setIsOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (!isLockedRef.current) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!isOpen) {
                  resetScroll();
                  setIsOpen(true);
                }
                isLockedRef.current = true;
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!isOpen) {
                  resetScroll();
                  setIsOpen(true);
                }
                isLockedRef.current = true;
              }}
              role="button"
              aria-label="Show hint"
              aria-expanded={isOpen}
            >
              i
            </div>
            <div className={`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-64 sm:max-h-[80vh] flex flex-col bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${isOpen ? 'flex' : 'hidden'}`}>
              <div
                className="flex-shrink-0 self-end m-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white sm:hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTooltip();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  closeTooltip();
                }}
                role="button"
                aria-label="Close hint"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div ref={scrollContentRef} className="overflow-y-auto px-3 pb-3 sm:p-3">
                <HtmlContent html={option.hint} variant="tooltip" />
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
