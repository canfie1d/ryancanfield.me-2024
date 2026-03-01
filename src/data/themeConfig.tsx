export const pagesUsingThemeColor = ["about", "work", "writing", "contact"];

export const corePages = ["about", "work", "writing", "contact"] as const;

export const pageNames = [
  "about",
  "work",
  "writing",
  "contact",
  "journey-to-eryndor",
  "404",
] as const;

export type PageNames = (typeof pageNames)[number];

export const themeNames = [
  "sampico",
  "kim",
  "léon",
  "random",
  "custom",
  "eryndor",
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
    textColors: ["#135b57", "#6e5156", "#8f4d4d", "#3d5a63", "#646464"],
  },
  {
    name: "kim",
    backgroundColors: ["#e0afa0", "#bcb8b1", "#b7b7a4", "#8a817c", "#f4f3ee"],
    textColors: ["#463F3A", "#463F3A", "#463F3A", "#dbcdc5", "#463F3A"],
  },
  {
    name: "léon",
    backgroundColors: ["#1B263B", "#2E4165", "#415A77", "#566D8A", "#9dbbe0"],
    textColors: ["#E0E1DD", "#E0E1DD", "#E0E1DD", "#E0E1DD", "#E0E1DD"],
  },
];

export const loreTheme: ThemeType = {
  name: "eryndor",
  backgroundColors: ["#1a2e1a", "#2d4a2d", "#3d6b3d", "#4a7c4a", "#c8e6c8"],
  textColors: ["#c8e6c8", "#c8e6c8", "#c8e6c8", "#c8e6c8", "#1a2e1a"],
};

export const unlockableThemeConfig: ThemeType[] = [loreTheme];
