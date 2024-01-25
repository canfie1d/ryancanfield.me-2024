export const pageNames = ["about", "work", "writing", "contact"] as const;
export type PageNames = (typeof pageNames)[number];

export const themeNames = [
  "sampico",
  "kim",
  "léon",
  "random",
  "custom",
] as const;

export type ThemeNames = (typeof themeNames)[number];

export type ThemeType = {
  name: ThemeNames;
  backgroundColors: string[];
  textColors: string[];
};

type ThemeConfigType = ThemeType[];

export const themeConfig: ThemeConfigType = [
  {
    name: "sampico",
    backgroundColors: ["#20b2aa", "#ffc0cb", "#f08080", "#add8e6", "#d3d3d3"],
    textColors: ["#135b57", "#927177", "#8f4d4d", "#547c89", "#646464"],
  },
  {
    name: "kim",
    backgroundColors: ["#bcb8b1", "#f4f3ee", "#e0afa0", "#b7b7a4", "#8a817c"],
    textColors: ["#463F3A", "#463F3A", "#463F3A", "#463F3A", "#463F3A"],
  },
  {
    name: "léon",
    backgroundColors: ["#2E4165", "#415A77", "#566D8A", "#778DA9", "#1B263B"],
    textColors: ["#E0E1DD", "#E0E1DD", "#E0E1DD", "#E0E1DD", "#E0E1DD"],
  },
];
