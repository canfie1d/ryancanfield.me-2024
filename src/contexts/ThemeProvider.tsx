import { useContext, useEffect } from "react";
import { ReactNode, createContext, useReducer } from "react";
import { themeConfig, ThemeType } from "../data/themeConfig";
import useLocalStorage from "react-use-localstorage";

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

type ThemeStateTypes = {
  name: ThemeType["name"];
  backgroundColors: ThemeType["backgroundColors"];
  textColors: ThemeType["textColors"];
  lockedColors: LockedColorType[];
  resetLockedColors: () => void;
  setLockedColor: (color: LockedColorType) => void;
  replaceLockedColor: (
    oldColor: LockedColorType,
    newColor: LockedColorType
  ) => void;
  setTheme: (newTheme: ThemeType) => void;
};

const reducer = (
  state: ThemeStateTypes,
  action:
    | SetThemeAction
    | SetLockedColorAction
    | ReplaceLockedColorAction
    | SetLockedColorsAction
    | ResetLockedColorsAction
) => {
  switch (action.type) {
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

  useEffect(() => {
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
      // Self healing local storage
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

  return (
    <Theme.Provider
      value={{
        name: state.name,
        backgroundColors: state.backgroundColors,
        textColors: state.textColors,
        lockedColors: state.lockedColors,
        setLockedColor: handleSetLockedColor,
        replaceLockedColor: handleReplaceLockedColor,
        resetLockedColors: handleResetLockedColors,
        setTheme: handleSetTheme,
      }}
    >
      <div className={`${state.name}`}>{children}</div>
    </Theme.Provider>
  );
};
