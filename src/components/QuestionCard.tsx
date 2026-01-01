import { useState, useRef, useCallback } from 'react';
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
  const [showNoteTooltip, setShowNoteTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const closeTooltip = useCallback(() => setShowNoteTooltip(false), []);
  useClickOutside(tooltipRef, showNoteTooltip, closeTooltip);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex-1">{question.question}</h2>
          {question.note && (
            <div ref={tooltipRef} className="relative group flex-shrink-0">
              <div
                className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNoteTooltip(!showNoteTooltip);
                }}
                role="button"
                aria-label="Show note"
                aria-expanded={showNoteTooltip}
              >
                ?
              </div>
              <div className={`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-80 sm:max-h-[70vh] flex flex-col bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${showNoteTooltip ? 'flex' : 'hidden sm:group-hover:flex'}`}>
                <button
                  className="flex-shrink-0 self-end m-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white sm:hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNoteTooltip(false);
                  }}
                  aria-label="Close note"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="overflow-y-auto px-3 pb-3 sm:p-3">
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
