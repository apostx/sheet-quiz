import type { Meta, StoryObj } from '@storybook/react';
import { Results } from './Results';
import type { QuizQuestion, QuizOption } from '../types/quiz';
import '../index.css';

const meta: Meta<typeof Results> = {
  title: 'Components/Results',
  component: Results,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Results>;

const option1q1: QuizOption = { response: 'Paris', hint: 'It is known as the City of Light' };
const option2q1: QuizOption = { response: 'London', hint: '' };
const option3q1: QuizOption = { response: 'Berlin', hint: '' };

const option1q2: QuizOption = { response: '4', hint: 'This is basic arithmetic' };
const option2q2: QuizOption = { response: '3', hint: '' };
const option3q2: QuizOption = { response: '5', hint: '' };

const option1q3: QuizOption = { response: 'Blue', hint: 'Like the sky' };
const option2q3: QuizOption = { response: 'Red', hint: '' };
const option3q3: QuizOption = { response: 'Green', hint: '' };

const sampleQuestions: QuizQuestion[] = [
  {
    question: 'What is the capital of France?',
    note: 'This question tests your knowledge of European geography',
    options: [option1q1, option2q1, option3q1],
    correctOption: option1q1,
  },
  {
    question: 'What is 2 + 2?',
    note: '',
    options: [option1q2, option2q2, option3q2],
    correctOption: option1q2,
  },
  {
    question: 'What color is the sky on a clear day?',
    note: 'Think about what you see when you look up',
    options: [option1q3, option2q3, option3q3],
    correctOption: option1q3,
  },
];

const perfectScoreAnswers = new Map<number, QuizOption>([
  [0, option1q1],
  [1, option1q2],
  [2, option1q3],
]);

const goodScoreAnswers = new Map<number, QuizOption>([
  [0, option1q1],
  [1, option1q2],
  [2, option2q3], // incorrect
]);

const mixedScoreAnswers = new Map<number, QuizOption>([
  [0, option1q1],
  [1, option2q2], // incorrect
  [2, option2q3], // incorrect
]);

const poorScoreAnswers = new Map<number, QuizOption>([
  [0, option2q1], // incorrect
  [1, option2q2], // incorrect
  [2, option2q3], // incorrect
]);

export const PerfectScore: Story = {
  args: {
    score: 3,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: perfectScoreAnswers,
    onRestart: () => console.log('Restart clicked'),
  },
};

export const GoodScore: Story = {
  args: {
    score: 2,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: goodScoreAnswers,
    onRestart: () => console.log('Restart clicked'),
  },
};

export const MixedScore: Story = {
  args: {
    score: 1,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: mixedScoreAnswers,
    onRestart: () => console.log('Restart clicked'),
  },
};

export const PoorScore: Story = {
  args: {
    score: 0,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: poorScoreAnswers,
    onRestart: () => console.log('Restart clicked'),
  },
};
