import { atom } from "recoil";
import { Game, PSNProfile, User } from "./interfaces";
import { Pages } from "./enums";

export const userState = atom({
  key: "userState",
  default: {} as User,
});

export const selectedPSNProfileState = atom({
  key: "selectedPSNProfileState",
  default: {} as PSNProfile
})

export const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

export const gameSearchModalState = atom({
  key: "gameSearchmodalState",
  default: false,
});

export const activePageState = atom({
  key: "activePageState",
  default: Pages.Home,
});

export const selectedGameState = atom({
  key: "selectedGameState",
  default: {} as Game
})
