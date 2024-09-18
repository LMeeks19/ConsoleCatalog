import { atom } from "recoil";
import { User } from "./interfaces/interfaces";
import { Pages } from "./enums";

export const userState = atom({
  key: "userState",
  default: {} as User,
});

export const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

export const searchModalState = atom({
  key: "searchmodalState",
  default: false,
});

export const addSubObjectiveModalState = atom({
  key: "addSubObjectiveModalState",
  default: false,
});

export const activePageState = atom({
  key: "activePageState",
  default: Pages.Home,
});
