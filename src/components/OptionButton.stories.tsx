import type { Meta, StoryObj } from '@storybook/react';
import { OptionButton } from './OptionButton';
import type { QuizOption } from '../types/quiz';
import '../index.css';

const meta: Meta<typeof OptionButton> = {
  title: 'Components/OptionButton',
  component: OptionButton,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof OptionButton>;

const sampleOption: QuizOption = {
  response: 'This is a sample answer',
  hint: '',
};

const sampleOptionWithHint: QuizOption = {
  response: 'This is an answer with a hint',
  hint: 'This is a helpful hint that appears on hover',
};

export const Default: Story = {
  args: {
    option: sampleOption,
    isSelected: false,
    isAnswered: false,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const Selected: Story = {
  args: {
    option: sampleOption,
    isSelected: true,
    isAnswered: false,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const CorrectAnswered: Story = {
  args: {
    option: sampleOption,
    isSelected: true,
    isAnswered: true,
    isCorrect: true,
    onClick: () => console.log('Option clicked'),
  },
};

export const IncorrectAnswered: Story = {
  args: {
    option: sampleOption,
    isSelected: true,
    isAnswered: true,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const NotSelectedAnswered: Story = {
  args: {
    option: sampleOption,
    isSelected: false,
    isAnswered: true,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const WithHint: Story = {
  args: {
    option: sampleOptionWithHint,
    isSelected: false,
    isAnswered: false,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const WithHintSelected: Story = {
  args: {
    option: sampleOptionWithHint,
    isSelected: true,
    isAnswered: false,
    isCorrect: false,
    onClick: () => console.log('Option clicked'),
  },
};

export const WithHintCorrect: Story = {
  args: {
    option: sampleOptionWithHint,
    isSelected: true,
    isAnswered: true,
    isCorrect: true,
    onClick: () => console.log('Option clicked'),
  },
};
