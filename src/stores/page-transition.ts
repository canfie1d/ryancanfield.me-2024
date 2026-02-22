import { create } from "zustand";

type PageTransitionState = {
  contentReady: boolean;
  setContentReady: (ready: boolean) => void;
};

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
  contentReady: false,
  setContentReady: (ready: boolean) => set({ contentReady: ready }),
}));
