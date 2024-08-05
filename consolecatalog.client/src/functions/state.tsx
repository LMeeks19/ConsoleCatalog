import { atom } from "recoil";
import { User } from "./interfaces";
import { Pages } from "./enums";

export const userState = atom({
  key: "userState",
  default: {} as User,
});

export const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

export const activePageState = atom({
  key: "activePageState",
  default: Pages.Home,
});
