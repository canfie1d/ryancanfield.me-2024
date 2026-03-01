import type { Meta, StoryObj } from "@storybook/react";
import ColorMenu from "./ColorMenu";

const meta: Meta<typeof ColorMenu> = {
  component: ColorMenu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColorMenu>;

export const Default: Story = {
  args: {
    index: 0,
    backgroundColor: "#3498db",
    colorPickerLocation: { top: 100, left: 100 },
  },
};
