import type { Meta, StoryObj } from "@storybook/react";
import PortableText from "./PortableText";

const meta: Meta<typeof PortableText> = {
  component: PortableText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PortableText>;

const sampleContent = [
  {
    _type: "block",
    _key: "a1",
    style: "h2",
    children: [{ _type: "span", _key: "a1-1", text: "Heading" }],
  },
  {
    _type: "block",
    _key: "a2",
    style: "normal",
    children: [{ _type: "span", _key: "a2-1", text: "Paragraph with " }],
  },
];

export const Default: Story = {
  args: {
    value: sampleContent,
  },
};
