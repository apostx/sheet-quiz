import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SpreadsheetList } from './SpreadsheetList';
import '../index.css';

const meta: Meta<typeof SpreadsheetList> = {
  title: 'Pages/SpreadsheetList',
  component: SpreadsheetList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SpreadsheetList>;

export const Empty: Story = {};
