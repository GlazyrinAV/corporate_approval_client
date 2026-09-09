import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar } from './SearchBar';
import { useState } from 'react';

const meta: Meta<typeof SearchBar> = {
  title: 'Widgets/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState<string>('');
    return (
      <div
        style={{ width: '500px', border: '1px solid #000', padding: '10px' }}
      >
        <SearchBar
          queryValue={query}
          onSearch={setQuery}
          onClear={() => {
            setQuery('');
          }}
        />
      </div>
    );
  }
};
