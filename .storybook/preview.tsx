import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/globals.scss";
import { StorybookRouterDecorator } from "./StorybookRouter";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookRouterDecorator>
        <Story />
      </StorybookRouterDecorator>
    ),
  ],
};

export default preview;
