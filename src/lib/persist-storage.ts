import pkg from "lz-string";
import { type StateStorage } from "zustand/middleware";

const { compress, decompress } = pkg;

export const localPersistStorage: StateStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
     
    return JSON.parse(decompress(str));
  },
  setItem: (name, value) => {
    localStorage.setItem(name, compress(JSON.stringify(value)));
  },
  removeItem: (name) => localStorage.removeItem(name),
};
