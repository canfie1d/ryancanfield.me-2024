import type { Meta, StoryObj } from "@storybook/react";
import GithubContributions from "./GithubContributions";

const meta: Meta<typeof GithubContributions> = {
  component: GithubContributions,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GithubContributions>;

export const Default: Story = {};
