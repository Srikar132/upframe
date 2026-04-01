// intro-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type IntroStore = {
  completed: boolean;
  _hasHydrated: boolean;
  markCompleted: () => void;
  setHasHydrated: (v: boolean) => void;
};

const useIntro = create<IntroStore>()(
  persist(
    (set) => ({
      completed: false,
      _hasHydrated: false,
      markCompleted: () => set({ completed: true }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: "intro-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useIntro;