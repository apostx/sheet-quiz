import type { Meta, StoryObj } from '@storybook/react';
import { QuestionCard } from './QuestionCard';
import type { QuizQuestion, QuizOption } from '../types/quiz';
import '../index.css';

const meta: Meta<typeof QuestionCard> = {
  title: 'Components/QuestionCard',
  component: QuestionCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

const option1: QuizOption = { response: 'Paris', hint: 'It is known as the City of Light' };
const option2: QuizOption = { response: 'London', hint: '' };
const option3: QuizOption = { response: 'Berlin', hint: '' };
const option4: QuizOption = { response: 'Madrid', hint: '' };

const sampleQuestion: QuizQuestion = {
  question: 'What is the capital of France?',
  note: 'This question tests your knowledge of European geography',
  options: [option1, option2, option3, option4],
  correctOption: option1,
};

const questionWithoutNote: QuizQuestion = {
  question: 'What is 2 + 2?',
  note: '',
  options: [
    { response: '4', hint: 'This is basic arithmetic' },
    { response: '3', hint: '' },
    { response: '5', hint: '' },
    { response: '22', hint: 'This would be string concatenation' },
  ],
  correctOption: { response: '4', hint: 'This is basic arithmetic' },
};

export const Default: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: null,
    isAnswered: false,
    onSelectOption: (option) => console.log('Selected:', option.response),
  },
};

export const WithoutNote: Story = {
  args: {
    question: questionWithoutNote,
    selectedOption: null,
    isAnswered: false,
    onSelectOption: (option) => console.log('Selected:', option.response),
  },
};

export const OptionSelected: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: option1,
    isAnswered: false,
    onSelectOption: (option) => console.log('Selected:', option.response),
  },
};

export const CorrectAnswerSubmitted: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: option1,
    isAnswered: true,
    onSelectOption: (option) => console.log('Selected:', option.response),
  },
};

export const IncorrectAnswerSubmitted: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: option2,
    isAnswered: true,
    onSelectOption: (option) => console.log('Selected:', option.response),
  },
};
