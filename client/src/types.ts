import { Dispatch, SetStateAction } from "react"

export interface IContext {
  nickname?: string;
  setNickname?: Dispatch<SetStateAction<string>>;
  setRoom?: Dispatch<SetStateAction<string>>;
  enterToRoom?: () => void;
  isOnRoom?: boolean;
}
