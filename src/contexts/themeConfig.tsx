export const themes = ["sherbert", "kimK", "professional"] as const;

export type ThemeTypes = (typeof themes)[number];

type ThemeConfigType = {
  [key in ThemeTypes]: {
    backgroundColors: {
      [key: string]: string;
    };
    textColors: {
      [key: string]: string;
    };
  };
};

export const themeConfig: ThemeConfigType = {
  sherbert: {
    backgroundColors: {
      home: "#d3d3d3",
      about: "#20b2aa",
      work: "#ffc0cb",
      writing: "#f08080",
      contact: "#add8e6",
    },
    textColors: {
      home: "#646464",
      about: "#135b57",
      work: "#927177",
      writing: "#8f4d4d",
      contact: "#547c89",
    },
  },
  kimK: {
    backgroundColors: {
      home: "#8a817c",
      about: "#bcb8b1",
      work: "#f4f3ee",
      writing: "#e0afa0",
      contact: "#b7b7a4",
    },
    textColors: {
      home: "#463F3A",
      about: "#463F3A",
      work: "#463F3A",
      writing: "#463F3A",
      contact: "#463F3A",
    },
  },
  professional: {
    backgroundColors: {
      home: "#1B263B",
      about: "#2E4165",
      work: "#415A77",
      writing: "#566D8A",
      contact: "#778DA9",
    },
    textColors: {
      home: "#E0E1DD",
      about: "#E0E1DD",
      work: "#0D1B2A",
      writing: "#1B263B",
      contact: "#1B263B",
    },
  },
};
