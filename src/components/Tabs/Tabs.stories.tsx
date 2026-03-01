import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const TabContent = ({ id, children }: { id: string; children: string }) => (
  <div id={id}>{children}</div>
);

export const Default: Story = {
  args: {
    pageName: "about",
    options: [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2" },
    ],
    children: [
      <TabContent
        key="1"
        id="tab1"
      >
        Content for tab 1
      </TabContent>,
      <TabContent
        key="2"
        id="tab2"
      >
        Content for tab 2
      </TabContent>,
    ],
  },
};
