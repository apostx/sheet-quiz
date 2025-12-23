import { useState, useMemo } from 'react';
import type { QuizOption, QuizTopic } from '../types/quiz';
import { shuffleOptions } from '../utils';

interface QuizState {
  currentQuestionIndex: number;
  selectedOption: QuizOption | null;
  answeredQuestions: Set<number>;
  correctAnswers: Set<number>;
  userAnswers: Map<number, QuizOption>;
  showResult: boolean;
}

export const useQuiz = (topic: QuizTopic | null) => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOption: null,
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
    setState(prev => ({ ...prev, selectedOption: option }));
  };

  const submitAnswer = () => {
    if (!state.selectedOption || !currentQuestion) return;

    const isCorrect = state.selectedOption === currentQuestion.correctOption;
    const newAnsweredQuestions = new Set(state.answeredQuestions);
    const newCorrectAnswers = new Set(state.correctAnswers);
    const newUserAnswers = new Map(state.userAnswers);

    newAnsweredQuestions.add(state.currentQuestionIndex);
    newUserAnswers.set(state.currentQuestionIndex, state.selectedOption);
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
        selectedOption: null,
      }));
    }
  };

  const restart = () => {
    setState({
      currentQuestionIndex: 0,
      selectedOption: null,
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
    selectedOption: state.selectedOption,
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
