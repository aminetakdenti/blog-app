import { type StoreApi, type UseBoundStore, create } from "zustand";

type Store = {
  userId: string;
  setUserId: (userId: string) => void;
};

const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
}));

export default useStore;
