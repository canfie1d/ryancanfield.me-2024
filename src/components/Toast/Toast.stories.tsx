import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    open: true,
    children: "Toast message",
    onClose: fn(),
  },
};

export const Achievement: Story = {
  args: {
    open: true,
    type: "achievement",
    children: "Achievement unlocked!",
    onClose: fn(),
  },
};

export const Alert: Story = {
  args: {
    open: true,
    type: "alert",
    children: "Alert message",
    onClose: fn(),
  },
};
