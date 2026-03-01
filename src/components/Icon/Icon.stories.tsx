import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "sword",
        "github",
        "gear",
        "palette",
        "spray",
        "backpack",
        "cert",
        "circle-x",
        "lock",
        "unlock",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "sword",
  },
};

export const Small: Story = {
  args: {
    name: "gear",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    name: "palette",
    size: "large",
  },
};

export const XSmall: Story = {
  args: {
    name: "cert",
    size: "x-small",
  },
};
