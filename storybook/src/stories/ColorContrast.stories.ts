import type { Meta, StoryObj } from '@storybook/react';
import { ColorContrastDemo } from './ColorContrastDemo';

const meta = {
  title: 'Color/Color Contrast',
  component: ColorContrastDemo,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  argTypes: {
    textColor: {
      control: { type: 'color' },
      description: 'Color of the headings',
      name: 'Text Color',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color of the container',
      name: 'Background Color',
    },
    paragraphFontSize: {
      control: { type: 'number', min: 8, max: 96, step: 1 },
      description: 'Font size of the paragraph',
      name: 'Paragraph Font Size',
      defaultValue: 16,
    },
    paragraphFontWeight: {
      control: { type: 'number' },
      description: 'Font weight of the paragraph',
      name: 'Paragraph Font Weight',
      defaultValue: 400,
    },
  },
} satisfies Meta<typeof ColorContrastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    textColor: '#000000',
    backgroundColor: '#ffffff',
    paragraphFontSize: 16,
    paragraphFontWeight: 400,
  },
};
