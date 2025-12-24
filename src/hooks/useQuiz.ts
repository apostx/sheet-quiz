import { useState, useMemo } from 'react';
import type { QuizOption, QuizTopic } from '../types/quiz';
import { shuffleOptions } from '../utils';

interface QuizState {
  currentQuestionIndex: number;
  selectedOptions: Set<QuizOption>;
  answeredQuestions: Set<number>;
  correctAnswers: Set<number>;
  userAnswers: Map<number, Set<QuizOption>>;
  showResult: boolean;
}

export const useQuiz = (topic: QuizTopic | null) => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptions: new Set(),
    answeredQuestions: new Set(),
    correctAnswers: new Set(),
    userAnswers: new Map(),
    showResult: false,
  });

  const shuffledQuestions = useMemo(() => {
    if (!topic) return [];
    return topic.questions.map(question => ({
      ...question,
      options: shuffleOptions(question.options),
    }));
  }, [topic]);

  const currentQuestion = shuffledQuestions[state.currentQuestionIndex] || null;
  const totalQuestions = shuffledQuestions.length;
  const isLastQuestion = state.currentQuestionIndex === totalQuestions - 1;

  const selectOption = (option: QuizOption) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedOptions);

      if (currentQuestion?.isMultiAnswer) {
        // Multi-answer: toggle selection
        if (newSelected.has(option)) {
          newSelected.delete(option);
        } else {
          newSelected.add(option);
        }
      } else {
        // Single-answer: replace selection
        newSelected.clear();
        newSelected.add(option);
      }

      return { ...prev, selectedOptions: newSelected };
    });
  };

  const submitAnswer = () => {
    if (state.selectedOptions.size === 0 || !currentQuestion) return;

    // Check exact match: all correct selected, no incorrect selected
    const isCorrect =
      state.selectedOptions.size === currentQuestion.correctOptions.length &&
      currentQuestion.correctOptions.every(opt => state.selectedOptions.has(opt));

    const newAnsweredQuestions = new Set(state.answeredQuestions);
    const newCorrectAnswers = new Set(state.correctAnswers);
    const newUserAnswers = new Map(state.userAnswers);

    newAnsweredQuestions.add(state.currentQuestionIndex);
    newUserAnswers.set(state.currentQuestionIndex, new Set(state.selectedOptions));
    if (isCorrect) {
      newCorrectAnswers.add(state.currentQuestionIndex);
    }

    setState(prev => ({
      ...prev,
      answeredQuestions: newAnsweredQuestions,
      correctAnswers: newCorrectAnswers,
      userAnswers: newUserAnswers,
    }));
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setState(prev => ({ ...prev, showResult: true }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOptions: new Set(),
      }));
    }
  };

  const restart = () => {
    setState({
      currentQuestionIndex: 0,
      selectedOptions: new Set(),
      answeredQuestions: new Set(),
      correctAnswers: new Set(),
      userAnswers: new Map(),
      showResult: false,
    });
  };

  const isAnswered = state.answeredQuestions.has(state.currentQuestionIndex);
  const score = state.correctAnswers.size;

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions,
    selectedOptions: state.selectedOptions,
    isAnswered,
    isLastQuestion,
    showResult: state.showResult,
    score,
    userAnswers: state.userAnswers,
    shuffledQuestions,
    selectOption,
    submitAnswer,
    nextQuestion,
    restart,
  };
};
