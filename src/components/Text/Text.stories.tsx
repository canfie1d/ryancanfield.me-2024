import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Default text content",
  },
};

export const Small: Story = {
  args: {
    children: "Small text",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large text",
    size: "large",
  },
};

export const XLarge: Story = {
  args: {
    children: "Extra large text",
    size: "xlarge",
  },
};

export const AsSpan: Story = {
  args: {
    children: "Rendered as span",
    as: "span",
  },
};

export const WithColor: Story = {
  args: {
    children: "Colored text",
    color: "#e74c3c",
  },
};
