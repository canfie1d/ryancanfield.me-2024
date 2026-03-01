import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ColorPicker from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    active: true,
    onClose: fn(),
    location: { top: 100, left: 100 },
    backgroundColor: "#3498db",
  },
};
