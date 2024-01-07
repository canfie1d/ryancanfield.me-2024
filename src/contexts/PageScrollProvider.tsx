import { useContext } from "react";
import { ReactNode, createContext, useReducer } from "react";

type PageScrollAction = {
  type: "SET_IS_SCROLLED";
  payload: boolean;
};

type PageScrollStateTypes = {
  scrolled: boolean;
  setScrolled: (arg: boolean) => void;
};

const reducer = (state: PageScrollStateTypes, action: PageScrollAction) => {
  switch (action.type) {
    case "SET_IS_SCROLLED":
      return {
        ...state,
        scrolled: action.payload,
      };
    default:
      return state;
  }
};

const PageScroll = createContext({} as PageScrollStateTypes);

export const usePageScrollContext = () => useContext(PageScroll);

export const PageScrollProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as PageScrollStateTypes);

  const handleSetScrolled = (arg: boolean) => {
    dispatch({ type: "SET_IS_SCROLLED", payload: arg });
  };

  return (
    <PageScroll.Provider
      value={{
        scrolled: state.scrolled,
        setScrolled: handleSetScrolled,
      }}
    >
      {children}
    </PageScroll.Provider>
  );
};
