import { useContext, useEffect } from "react";
import { ReactNode, createContext, useReducer } from "react";
import { ThemeTypes, themes, themeConfig } from "./themeConfig";
import useLocalStorage from "react-use-localstorage";

type ThemeAction = {
  type: "SET_THEME";
  payload: ThemeTypes;
};

type ThemeStateTypes = {
  theme: ThemeTypes;
  backgroundColors: {
    [key: string]: string;
  };
  textColors: {
    [key: string]: string;
  };
  setTheme: (newTheme: ThemeTypes) => void;
};

const reducer = (state: ThemeStateTypes, action: ThemeAction) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
        textColors: themeConfig[action.payload].textColors,
        backgroundColors: themeConfig[action.payload].backgroundColors,
      };
    default:
      return state;
  }
};

export const useThemeContext = () => useContext(Theme);

export const Theme = createContext({} as ThemeStateTypes);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as ThemeStateTypes);
  const [locTheme, setLocTheme] = useLocalStorage("theme", "sherbert");

  useEffect(() => {
    if (!themes.includes(locTheme as ThemeTypes)) {
      localStorage.setItem("theme", themes[0]);
    }
    if (locTheme && !state.theme) {
      dispatch({ type: "SET_THEME", payload: locTheme as ThemeTypes });
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeTypes) => {
    dispatch({ type: "SET_THEME", payload: newTheme });
    setLocTheme(newTheme);
  };

  return (
    <Theme.Provider
      value={{
        theme: state.theme,
        backgroundColors: state.backgroundColors,
        textColors: state.textColors,
        setTheme: handleSetTheme,
      }}
    >
      <div className={`${state.theme}`}>{children}</div>
    </Theme.Provider>
  );
};
