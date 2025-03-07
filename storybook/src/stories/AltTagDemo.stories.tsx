import type { Meta, StoryObj } from '@storybook/react';
import { AltTagDemo } from './AltTagDemo';

const meta = {
  title: 'Images/Alt Tags',
  component: AltTagDemo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    altType: {
      control: 'radio',
      options: ['decorative', 'descriptive'],
      description: 'Type of alt tag to demonstrate',
    },
  },
} satisfies Meta<typeof AltTagDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Examples: Story = {
  args: {
    altType: 'descriptive',
  },
};
