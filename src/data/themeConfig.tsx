export const pagesUsingThemeColor = ["about", "work", "writing", "contact"];

export const pageNames = [
  "about",
  "work",
  "writing",
  "contact",
  "journeys-end",
  "404",
] as const;

export type PageNames = (typeof pageNames)[number];

export const themeNames = [
  "sampico",
  "kim",
  "léon",
  "random",
  "custom",
  "rondo",
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
  name: "rondo",
  backgroundColors: ["#0077be", "#00a8e8", "#00c3ff", "#00eaff", "#a6faff"],
  textColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000"],
};

export const unlockableThemeConfig: ThemeType[] = [loreTheme];
