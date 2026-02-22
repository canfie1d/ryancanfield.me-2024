import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import IconMenu from "./IconMenu";

const meta: Meta<typeof IconMenu> = {
  component: IconMenu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconMenu>;

export const Default: Story = {
  args: {
    actions: [
      { icon: "github", label: "GitHub", onClick: fn() },
      { icon: "palette", label: "Themes", onClick: fn() },
      { icon: "gear", label: "Settings", onClick: fn() },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    actions: [
      { icon: "github", label: "GitHub", href: "https://github.com" },
      { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
    actions: [
      { icon: "spray", label: "Spray", onClick: fn() },
      { icon: "backpack", label: "Inventory", onClick: fn() },
    ],
  },
};
