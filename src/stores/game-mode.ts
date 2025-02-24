import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GameModeTypes = {
  about: boolean;
  work: boolean;
  writing: boolean;
  contact: boolean;
};

export type GameModeGetterTypes = {
  allGameModesActive: boolean;
  activeGameModes: GameModeTypes;
};

export type GameModeSetterTypes = {
  setGameMode: (arg: GameModeTypes) => void;
  resetGameModes: () => void;
};

type GameModeStore = GameModeGetterTypes & GameModeSetterTypes;

export const InitialGameModeActiveState = {
  about: false,
  work: false,
  writing: false,
  contact: false,
} as const;

export const useGameModeStore = create<GameModeStore>()(
  persist(
    (set, get) => ({
      allGameModesActive: false,
      activeGameModes: InitialGameModeActiveState,
      setGameMode: (arg: GameModeTypes) => {
        set({
          activeGameModes: {
            ...get().activeGameModes,
            ...arg,
          },
          allGameModesActive: Object.values({
            ...get().activeGameModes,
            ...arg,
          }).every((mode) => mode),
        });
      },
      resetGameModes: () => {
        set({
          activeGameModes: InitialGameModeActiveState,
          allGameModesActive: false,
        });
      },
    }),
    {
      name: "game-mode-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// import { use } from "react";
// import { ReactNode, createContext, useReducer } from "react";

// type SetGameModeAction = {
//   type: "SET_GAME_MODE";
//   payload: GameModePayload;
// };

// export type GameModePayload = {
//   [key in keyof GameModeTypes]: boolean;
// };

// export type GameModeTypes = {
//   about: boolean;
//   work: boolean;
//   writing: boolean;
//   contact: boolean;
// };

// type GameModeStateTypes = {
//   allGameModesActive: boolean;
//   activeGameModes: GameModeTypes;
//   setGameMode: (arg: GameModePayload) => void;
// };

// type GameModeActions = SetGameModeAction;

// const reducer = (state: GameModeStateTypes, action: GameModeActions) => {
//   switch (action.type) {
//     case "SET_GAME_MODE":
//       return {
//         ...state,
//         activeGameModes: { ...state.activeGameModes, ...action.payload },
//       };
//     default:
//       return state;
//   }
// };

// const GameModeContext = createContext({} as GameModeStateTypes);

// export const useGameModeContext = () => use(GameModeContext);

// export const GameModeProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     activeGameModes: {
//       about: false,
//       work: false,
//       writing: false,
//       contact: false,
//     },
//   } as GameModeStateTypes);

//   const handleSetGameMode = (arg: GameModePayload) => {
//     dispatch({ type: "SET_GAME_MODE", payload: arg });
//   };

//   return (
//     <GameModeContext.Provider
//       value={{
//         allGameModesActive:
//           state.activeGameModes.about &&
//           state.activeGameModes.work &&
//           state.activeGameModes.writing &&
//           state.activeGameModes.contact,
//         activeGameModes: state.activeGameModes,
//         setGameMode: handleSetGameMode,
//       }}
//     >
//       {children}
//     </GameModeContext.Provider>
//   );
// };
