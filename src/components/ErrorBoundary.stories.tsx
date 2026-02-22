import type { Meta, StoryObj } from "@storybook/react";
import ErrorBoundary from "./ErrorBoundary";

const ThrowingComponent = () => {
  throw new Error("Test error for Storybook");
};

const meta: Meta<typeof ErrorBoundary> = {
  component: ErrorBoundary,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  args: {
    children: <div>Normal content</div>,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowingComponent />,
  },
};
