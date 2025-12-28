import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ListManager } from './ListManager';
import '../index.css';

interface SimpleItem {
  id: string;
  label: string;
}

const meta: Meta<typeof ListManager<SimpleItem>> = {
  title: 'Components/ListManager',
  component: ListManager,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ListManager<SimpleItem>>;

const sampleItems: SimpleItem[] = [
  { id: '1', label: 'First Item' },
  { id: '2', label: 'Second Item' },
  { id: '3', label: 'Third Item' },
];

export const Empty: Story = {
  args: {
    items: [],
    onAdd: (value) => console.log('Add:', value),
    onDelete: (item) => console.log('Delete:', item),
    onReorder: (items) => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id,
  },
};

export const WithItems: Story = {
  args: {
    items: sampleItems,
    onAdd: (value) => console.log('Add:', value),
    onDelete: (item) => console.log('Delete:', item),
    onReorder: (items) => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id,
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      label: `Item ${i + 1}`,
    })),
    onAdd: (value) => console.log('Add:', value),
    onDelete: (item) => console.log('Delete:', item),
    onReorder: (items) => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id,
  },
};

function InteractiveListManager() {
  const [items, setItems] = useState<SimpleItem[]>(sampleItems);

  const handleAdd = (value: string) => {
    const newItem = { id: String(Date.now()), label: value };
    setItems([...items, newItem]);
  };

  const handleDelete = (item: SimpleItem) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handleReorder = (newItems: SimpleItem[]) => {
    setItems(newItems);
  };

  return (
    <ListManager
      items={items}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onReorder={handleReorder}
      renderItem={(item) => <span>{item.label}</span>}
      placeholder="Enter a new item"
      emptyMessage="No items yet"
      getId={(item) => item.id}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveListManager />,
};
