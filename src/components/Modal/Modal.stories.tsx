import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Modal, { ModalHeader } from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    show: true,
    header: (
      <ModalHeader
        onClose={fn()}
        title="Modal Title"
        subtitle="Optional subtitle"
        icon="gear"
      />
    ),
    children: "Modal content goes here.",
    onClose: fn(),
  },
};

export const Small: Story = {
  args: {
    show: true,
    header: (
      <ModalHeader
        onClose={fn()}
        title="Small Modal"
        icon="cert"
      />
    ),
    children: "Compact modal content.",
    small: true,
    onClose: fn(),
  },
};

export const BottomSheet: Story = {
  args: {
    show: true,
    header: (
      <ModalHeader
        onClose={fn()}
        title="Bottom Sheet"
        icon="palette"
      />
    ),
    children: "Content slides up from bottom.",
    bottomSheet: true,
    onClose: fn(),
  },
};
