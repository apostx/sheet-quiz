import type { Meta, StoryObj } from '@storybook/react';
import { ShareButton } from './ShareButton';
import '../index.css';

const meta: Meta<typeof ShareButton> = {
  title: 'Components/ShareButton',
  component: ShareButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

const sampleData = {
  version: 1 as const,
  spreadsheets: [
    { id: 'spreadsheet-1', order: 0 },
    { id: 'spreadsheet-2', order: 1 },
  ],
  sheets: [
    { spreadsheetId: 'spreadsheet-1', name: 'Quiz 1', order: 0 },
    { spreadsheetId: 'spreadsheet-1', name: 'Quiz 2', order: 1 },
  ],
};

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const CustomLabel: Story = {
  args: {
    data: sampleData,
    label: 'Export List',
  },
};

export const EmptyData: Story = {
  args: {
    data: {
      version: 1 as const,
      spreadsheets: [],
      sheets: [],
    },
  },
};
