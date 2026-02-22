import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    textColor: "#fff",
    backgroundColor: "#3498db",
    children: "React",
  },
};

export const WithLink: Story = {
  args: {
    textColor: "#fff",
    backgroundColor: "#2ecc71",
    children: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
};
