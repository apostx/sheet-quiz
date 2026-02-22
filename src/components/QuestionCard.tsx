import { useState, useRef, useCallback, useEffect } from 'react';
import type { QuizQuestion, QuizOption } from '../types/quiz';
import { OptionButton } from './OptionButton';
import { HtmlContent } from './HtmlContent';
import { useClickOutside } from '../hooks/useClickOutside';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptions: Set<QuizOption>;
  isAnswered: boolean;
  onSelectOption: (option: QuizOption) => void;
}

export const QuestionCard = ({
  question,
  selectedOptions,
  isAnswered,
  onSelectOption,
}: QuestionCardProps) => {
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-6">
          <h2 className="text-base sm:text-lg font-semibold leading-relaxed flex-1 min-w-0">
            <HtmlContent html={question.question} variant="light" />
          </h2>
          {question.note && (
            <div
              ref={tooltipRef}
              className="relative flex-shrink-0"
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
                className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer"
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
                aria-label="Show note"
                aria-expanded={isOpen}
              >
                ?
              </div>
              <div className={`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-80 sm:max-h-[70vh] flex flex-col bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${isOpen ? 'flex' : 'hidden'}`}>
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
                  aria-label="Close note"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div ref={scrollContentRef} className="overflow-y-auto px-3 pb-3 sm:p-3">
                  <HtmlContent html={question.note} variant="tooltip" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={`opt-${index}-${option.response.slice(0, 15)}`}
              option={option}
              isSelected={selectedOptions.has(option)}
              isAnswered={isAnswered}
              isCorrect={question.correctOptions.includes(option)}
              isMultiAnswer={question.isMultiAnswer}
              onClick={() => onSelectOption(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
