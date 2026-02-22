import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page content</div>,
  },
};
