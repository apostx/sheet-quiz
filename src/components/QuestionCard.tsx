import { useState, useRef, useCallback } from 'react';
import type { QuizQuestion, QuizOption } from '../types/quiz';
import { OptionButton } from './OptionButton';
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
              <div className={`absolute bottom-full right-0 mb-2 w-64 sm:w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 ${showNoteTooltip ? 'block' : 'hidden group-hover:block'}`}>
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
