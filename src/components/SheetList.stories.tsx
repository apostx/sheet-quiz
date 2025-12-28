import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SheetList } from './SheetList';
import '../index.css';

const meta: Meta<typeof SheetList> = {
  title: 'Pages/SheetList',
  component: SheetList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/example-spreadsheet-id']}>
        <Routes>
          <Route path="/:spreadsheetId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SheetList>;

export const Empty: Story = {};
