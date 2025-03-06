import type { Meta, StoryObj } from '@storybook/react';
import { ColorContrastDemo } from './ColorContrastDemo';

const meta = {
  title: 'Example/Color Contrast',
  component: ColorContrastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    textColor: {
      control: { type: 'color' },
      description: 'Color of the headings',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color of the container',
    },
  },
} satisfies Meta<typeof ColorContrastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    textColor: '#000000',
    backgroundColor: '#ffffff',
  },
};
