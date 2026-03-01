import type { Meta, StoryObj } from "@storybook/react";
import TitleHeader from "./TitleHeader";

const meta: Meta<typeof TitleHeader> = {
  component: TitleHeader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TitleHeader>;

export const Default: Story = {
  args: {
    iconName: "gear",
    title: "Settings",
  },
};

export const WithDifferentIcon: Story = {
  args: {
    iconName: "palette",
    title: "Themes",
  },
};
