import { create } from "zustand";

const useHomeQueryParamsStore = create(set => ({
  homeQueryParams: {},
  setHomeQueryParams: params => set({ homeQueryParams: params }),
}));

export default useHomeQueryParamsStore;
