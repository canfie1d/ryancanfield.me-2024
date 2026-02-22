import type { Meta, StoryObj } from "@storybook/react";
import AchievementToast from "./AchievementToast";

const meta: Meta<typeof AchievementToast> = {
  component: AchievementToast,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AchievementToast>;

export const Default: Story = {};
