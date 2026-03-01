import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    pageName: "about",
    children: "Card content goes here.",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Article",
    pageName: "work",
    children: "Article content.",
    footer: <span style={{ fontSize: "0.875rem" }}>Read more →</span>,
  },
};

export const AchievementType: Story = {
  args: {
    title: "First Steps",
    type: "achievement",
    pageName: "about",
    children: "You've completed your first task!",
  },
};

export const WithExternalLink: Story = {
  args: {
    title: "External Link",
    pageName: "contact",
    href: "https://example.com",
    opensInNewPage: true,
    children: "Opens in new tab",
  },
};

export const WithOnClick: Story = {
  args: {
    title: "Clickable",
    pageName: "writing",
    onClick: () => alert("Clicked!"),
    children: "Click to interact",
  },
};
