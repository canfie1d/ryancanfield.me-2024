import type { Meta, StoryObj } from "@storybook/react";
import PageWrapper from "./PageWrapper";

const meta: Meta<typeof PageWrapper> = {
  component: PageWrapper,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PageWrapper>;

export const Default: Story = {
  args: {
    pageName: "about",
    children: "Page content",
  },
};

export const Current: Story = {
  args: {
    pageName: "work",
    isCurrent: true,
    children: "Current page content",
  },
};
