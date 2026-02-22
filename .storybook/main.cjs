const path = require("path");
const svgr = require("vite-plugin-svgr").default;

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.push(svgr());
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
          { find: "~", replacement: path.resolve(__dirname, "../src") },
        ],
      },
      css: {
        ...config.css,
        preprocessorOptions: {
          scss: {},
        },
      },
    };
  },
};

module.exports = config;
