import { useState, useEffect, useRef } from 'react';
import type { QuizOption, QuizTopic } from '../types/quiz';

interface QuizState {
  currentQuestionIndex: number;
  selectedOptions: Set<QuizOption>;
  answeredQuestions: Set<number>;
  correctAnswers: Set<number>;
  userAnswers: Map<number, Set<QuizOption>>;
  showResult: boolean;
}

export interface QuizInitialState {
  currentQuestionIndex: number;
  answers: Map<number, Set<number>>; // questionIndex → Set<optionIndex>
  currentSelections: Set<number>; // option indices for current question
  showResult: boolean;
}

const buildInitialState = (
  topic: QuizTopic,
  initial?: QuizInitialState,
): QuizState => {
  if (!initial || initial.answers.size === 0 && initial.currentSelections.size === 0 && !initial.showResult) {
    return {
      currentQuestionIndex: initial?.currentQuestionIndex ?? 0,
      selectedOptions: new Set(),
      answeredQuestions: new Set(),
      correctAnswers: new Set(),
      userAnswers: new Map(),
      showResult: false,
    };
  }

  const questions = topic.questions;
  const answeredQuestions = new Set<number>();
  const correctAnswers = new Set<number>();
  const userAnswers = new Map<number, Set<QuizOption>>();

  // Restore answers by mapping option indices back to object references
  for (const [qIdx, optIndices] of initial.answers) {
    if (qIdx >= questions.length) continue;
    const question = questions[qIdx];
    const selectedOpts = new Set<QuizOption>();

    for (const optIdx of optIndices) {
      if (optIdx < question.options.length) {
        selectedOpts.add(question.options[optIdx]);
      }
    }

    if (selectedOpts.size > 0) {
      answeredQuestions.add(qIdx);
      userAnswers.set(qIdx, selectedOpts);

      // Recompute correctness
      const isCorrect =
        selectedOpts.size === question.correctOptions.length &&
        question.correctOptions.every(opt => selectedOpts.has(opt));
      if (isCorrect) {
        correctAnswers.add(qIdx);
      }
    }
  }

  // Restore current selections
  const selectedOptions = new Set<QuizOption>();
  const currentQ = questions[initial.currentQuestionIndex];
  if (currentQ && initial.currentSelections.size > 0) {
    for (const optIdx of initial.currentSelections) {
      if (optIdx < currentQ.options.length) {
        selectedOptions.add(currentQ.options[optIdx]);
      }
    }
  }

  return {
    currentQuestionIndex: initial.currentQuestionIndex,
    selectedOptions,
    answeredQuestions,
    correctAnswers,
    userAnswers,
    showResult: initial.showResult,
  };
};

export const useQuiz = (topic: QuizTopic | null, initialState?: QuizInitialState) => {
  const initialStateRef = useRef(initialState);
  initialStateRef.current = initialState;

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptions: new Set<QuizOption>(),
    answeredQuestions: new Set<number>(),
    correctAnswers: new Set<number>(),
    userAnswers: new Map<number, Set<QuizOption>>(),
    showResult: false,
  });

  // Initialize/reinitialize state when topic becomes available
  useEffect(() => {
    if (topic) {
      setState(buildInitialState(topic, initialStateRef.current));
      initialStateRef.current = undefined; // Only apply initial state once
    }
  }, [topic]);

  // Questions are already shuffled by QuizPage — use directly
  const questions = topic?.questions ?? [];
  const currentQuestion = questions[state.currentQuestionIndex] || null;
  const totalQuestions = questions.length;
  const isLastQuestion = state.currentQuestionIndex === totalQuestions - 1;

  const selectOption = (option: QuizOption) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedOptions);

      if (currentQuestion?.isMultiAnswer) {
        if (newSelected.has(option)) {
          newSelected.delete(option);
        } else {
          newSelected.add(option);
        }
      } else {
        newSelected.clear();
        newSelected.add(option);
      }

      return { ...prev, selectedOptions: newSelected };
    });
  };

  const submitAnswer = () => {
    if (state.selectedOptions.size === 0 || !currentQuestion) return;

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
    questions,
    selectOption,
    submitAnswer,
    nextQuestion,
    restart,
  };
};
