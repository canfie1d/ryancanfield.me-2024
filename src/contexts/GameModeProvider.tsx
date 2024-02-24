import { useContext } from "react";
import { ReactNode, createContext, useReducer } from "react";

type SetGameModeAction = {
  type: "SET_GAME_MODE";
  payload: GameModePayload;
};

export type GameModePayload = {
  [key in keyof GameModeTypes]: boolean;
};

export type GameModeTypes = {
  about: boolean;
  work: boolean;
  writing: boolean;
  contact: boolean;
};

type GameModeStateTypes = {
  activeGameModes: GameModeTypes;
  setGameMode: (arg: GameModePayload) => void;
};

type GameModeActions = SetGameModeAction;

const reducer = (state: GameModeStateTypes, action: GameModeActions) => {
  switch (action.type) {
    case "SET_GAME_MODE":
      return {
        ...state,
        activeGameModes: { ...state.activeGameModes, ...action.payload },
      };
    default:
      return state;
  }
};

const GameModeContext = createContext({} as GameModeStateTypes);

export const useGameModeContext = () => useContext(GameModeContext);

export const GameModeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    activeGameModes: {
      about: false,
      work: false,
      writing: false,
      contact: false,
    },
  } as GameModeStateTypes);

  const handleSetGameMode = (arg: GameModePayload) => {
    dispatch({ type: "SET_GAME_MODE", payload: arg });
  };

  return (
    <GameModeContext.Provider
      value={{
        activeGameModes: state.activeGameModes,
        setGameMode: handleSetGameMode,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};
