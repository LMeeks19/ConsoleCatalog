import { atom } from "recoil";
import { User } from "./interfaces";

export const userState = atom({
  key: "userState",
  default: {} as User,
});
