import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    id: "toggle-1",
    name: "toggle1",
    label: "Enable notifications",
    checked: false,
    onChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    id: "toggle-2",
    name: "toggle2",
    label: "Dark mode",
    checked: true,
    onChange: fn(),
  },
};

export const WithDescription: Story = {
  args: {
    id: "toggle-3",
    name: "toggle3",
    label: "Auto-save",
    description: "Automatically save your work as you type",
    checked: false,
    onChange: fn(),
  },
};

export const Danger: Story = {
  args: {
    id: "toggle-4",
    name: "toggle4",
    label: "Delete account",
    checked: false,
    danger: true,
    onChange: fn(),
  },
};
