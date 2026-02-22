import type { Meta, StoryObj } from "@storybook/react";
import PagePreview from "./PagePreview";

const meta: Meta<typeof PagePreview> = {
  component: PagePreview,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PagePreview>;

export const About: Story = {
  args: {
    pageName: "about",
  },
};

export const Work: Story = {
  args: {
    pageName: "work",
  },
};
