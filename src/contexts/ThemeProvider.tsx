import { useContext, useEffect } from "react";
import { ReactNode, createContext, useReducer } from "react";
import { themeConfig, ThemeType } from "../data/themeConfig";
import useLocalStorage from "react-use-localstorage";
import { getTextColor } from "../helpers/getTextColor";

type LockedColorType = { hex: string; position: number };

type SetThemeAction = {
  type: "SET_THEME";
  payload: ThemeType;
};

type SetLockedColorAction = {
  type: "SET_LOCKED_COLOR";
  payload: LockedColorType;
};

type SetLockedColorsAction = {
  type: "SET_LOCKED_COLORS";
  payload: LockedColorType[];
};

type ResetLockedColorsAction = {
  type: "RESET_LOCKED_COLORS";
};

type ReplaceLockedColorAction = {
  type: "REPLACE_LOCKED_COLOR";
  payload: {
    oldColor: LockedColorType;
    newColor: LockedColorType;
  };
};

// type SetLoreThemeActiveAction = {
//   type: "SET_LORE_THEME_ACTIVE";
//   payload: string;
// };

type ThemeStateTypes = {
  name: ThemeType["name"];
  backgroundColors: ThemeType["backgroundColors"];
  textColors: ThemeType["textColors"];
  lockedColors: LockedColorType[];
  // loreThemeActive: string;
  resetLockedColors: () => void;
  setLockedColor: (color: LockedColorType) => void;
  replaceLockedColor: (
    oldColor: LockedColorType,
    newColor: LockedColorType
  ) => void;
  setTheme: (newTheme: ThemeType) => void;
  buildCustomTheme: (theme: ThemeType) => ThemeType;
  // setLoreThemeActive: (code: string) => void;
};

const reducer = (
  state: ThemeStateTypes,
  action:
    | SetThemeAction
    | SetLockedColorAction
    | ReplaceLockedColorAction
    | SetLockedColorsAction
    | ResetLockedColorsAction
  // | SetLoreThemeActiveAction
) => {
  switch (action.type) {
    // case "SET_LORE_THEME_ACTIVE":
    //   return {
    //     ...state,
    //     loreThemeActive: action.payload,
    //   };
    case "SET_THEME":
      return {
        ...state,
        name: action.payload.name,
        backgroundColors: action.payload.backgroundColors,
        textColors: action.payload.textColors,
      };
    case "SET_LOCKED_COLORS":
      return {
        ...state,
        lockedColors: action.payload,
      };
    case "RESET_LOCKED_COLORS":
      return {
        ...state,
        lockedColors: [],
      };
    case "SET_LOCKED_COLOR":
      if (
        state.lockedColors?.some(
          (lockedColor) => lockedColor.hex === action.payload.hex
        )
      ) {
        const filteredColors = state.lockedColors.filter(
          (lockedColor) => lockedColor.hex !== action.payload.hex
        );
        return {
          ...state,
          lockedColors: filteredColors,
        };
      } else {
        return {
          ...state,
          lockedColors: state.lockedColors
            ? [...state.lockedColors, action.payload]
            : [action.payload],
        };
      }
    case "REPLACE_LOCKED_COLOR":
      if (
        state.lockedColors.some(
          (lockedColor) => lockedColor.hex === action.payload.oldColor.hex
        )
      ) {
        return {
          ...state,
          lockedColors: [
            ...state.lockedColors.filter(
              (lockedColor) => lockedColor.hex !== action.payload.oldColor.hex
            ),
            action.payload.newColor,
          ],
        };
      }
      return {
        ...state,
        lockedColors: [...state.lockedColors, action.payload.newColor],
      };
    default:
      return state;
  }
};

const Theme = createContext({} as ThemeStateTypes);

export const useThemeContext = () => useContext(Theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as ThemeStateTypes);
  const [locTheme, setLocTheme] = useLocalStorage(
    "theme",
    JSON.stringify(themeConfig[0])
  );
  const [locLockedColors, setLocLockedColors] = useLocalStorage(
    "lockedColors",
    JSON.stringify([])
  );
  // const [locLoreThemeActive, setLocLoreThemeActive] = useLocalStorage(
  //   "loreThemeActive",
  //   ""
  // );

  useEffect(() => {
    // if (locLoreThemeActive === import.meta.env.VITE_LORE_PASSWORD) {
    //   setLoreThemeActive(locLoreThemeActive);
    // }

    // Self healing local storage
    if (locTheme) {
      if (typeof locTheme === "string") {
        dispatch({ type: "SET_THEME", payload: themeConfig[0] });
        setLocTheme(JSON.stringify(themeConfig[0]));
      } else if (!state.name) {
        dispatch({ type: "SET_THEME", payload: JSON.parse(locTheme) });
      }
    }

    if (locLockedColors) {
      if (
        JSON.parse(locLockedColors).some(
          (lockedColor: LockedColorType | string) =>
            typeof lockedColor === "string"
        )
      ) {
        dispatch({ type: "SET_LOCKED_COLORS", payload: [] });
        setLocLockedColors(JSON.stringify([]));
      } else if (!state.lockedColors) {
        dispatch({
          type: "SET_LOCKED_COLORS",
          payload: JSON.parse(locLockedColors),
        });
      }

      // Restore saved theme
      const newTheme = buildCustomTheme(JSON.parse(locTheme));
      handleSetTheme(newTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeType) => {
    dispatch({ type: "SET_THEME", payload: newTheme });
    setLocTheme(JSON.stringify(newTheme));
  };

  const handleResetLockedColors = () => {
    dispatch({ type: "RESET_LOCKED_COLORS" });
    setLocLockedColors(JSON.stringify([]));
  };

  // const setLoreThemeActive = (code: string) => {
  //   if (code === import.meta.env.VITE_LORE_PASSWORD) {
  //     dispatch({ type: "SET_LORE_THEME_ACTIVE", payload: code });
  //     if (locLoreThemeActive !== code) {
  //       setLocLoreThemeActive(code);
  //     }
  //   }
  // };

  const handleSetLockedColor = (color: LockedColorType) => {
    if (
      JSON.parse(locLockedColors)?.some(
        (lockedLocColor: LockedColorType) => lockedLocColor.hex === color.hex
      )
    ) {
      const newLocLockedColors = [
        ...JSON.parse(locLockedColors).filter(
          (locColor: LockedColorType) => locColor.hex !== color.hex
        ),
      ];
      setLocLockedColors(JSON.stringify(newLocLockedColors));
    } else {
      setLocLockedColors(
        JSON.stringify([...JSON.parse(locLockedColors), color])
      );
    }

    dispatch({ type: "SET_LOCKED_COLOR", payload: color });
  };

  const handleReplaceLockedColor = (
    oldColor: LockedColorType,
    newColor: LockedColorType
  ) => {
    if (
      JSON.parse(locLockedColors)?.some(
        (lockedLocColor: LockedColorType) => lockedLocColor.hex === oldColor.hex
      )
    ) {
      const newLocLockedColors = [
        ...JSON.parse(locLockedColors).filter(
          (color: LockedColorType) => color.hex !== oldColor.hex
        ),
        newColor,
      ];
      setLocLockedColors(JSON.stringify(newLocLockedColors));
    } else {
      setLocLockedColors(
        JSON.stringify([...JSON.parse(locLockedColors), newColor])
      );
    }
    dispatch({ type: "REPLACE_LOCKED_COLOR", payload: { oldColor, newColor } });
  };

  const buildCustomTheme = (theme: ThemeType) => {
    let newBgColors: ThemeType["backgroundColors"] = [];
    let newTextColors: ThemeType["textColors"] = [];

    theme.backgroundColors.forEach((color: string, index: number) => {
      if (
        JSON.parse(locLockedColors).some(
          (lockedColor: LockedColorType) => lockedColor.position === index
        )
      ) {
        const lockedColor = JSON.parse(locLockedColors).find(
          (lockedColor: LockedColorType) => lockedColor.position === index
        );
        newBgColors.push(lockedColor!.hex);
      } else {
        newBgColors.push(color);
      }
    });

    theme.textColors.forEach((color: string, index: number) => {
      if (
        JSON.parse(locLockedColors).some(
          (lockedColor: LockedColorType) => lockedColor.position === index
        )
      ) {
        const lockedColor = JSON.parse(locLockedColors).find(
          (lockedColor: LockedColorType) => lockedColor.position === index
        );
        newTextColors.push(getTextColor(lockedColor!.hex));
      } else {
        newTextColors.push(color);
      }
    });

    const customTheme: ThemeType = {
      name: "custom",
      backgroundColors: newBgColors,
      textColors: newTextColors,
    };

    return customTheme;
  };

  return (
    <Theme.Provider
      value={{
        name: state.name,
        backgroundColors: state.backgroundColors,
        textColors: state.textColors,
        lockedColors: state.lockedColors,
        // loreThemeActive: state.loreThemeActive,
        setLockedColor: handleSetLockedColor,
        replaceLockedColor: handleReplaceLockedColor,
        resetLockedColors: handleResetLockedColors,
        setTheme: handleSetTheme,
        buildCustomTheme: buildCustomTheme,
        // setLoreThemeActive: setLoreThemeActive,
      }}
    >
      <div className={`${state.name}`}>{children}</div>
    </Theme.Provider>
  );
};
