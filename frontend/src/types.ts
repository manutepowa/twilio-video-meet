import { Dispatch, SetStateAction } from "react"
import {
    LocalParticipant,
  LocalTrackPublication,
  LocalVideoTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
} from "twilio-video"

export interface IChatContext {
  isChatOpen?: boolean
  setIsChatOpen?: Dispatch<SetStateAction<boolean>>
}
export interface IContext {
  nickname?: string;
  setNickname?: Dispatch<SetStateAction<string>>;
  setRoomName?: Dispatch<SetStateAction<string>>;
  enterToRoom?: () => void;
  isOnRoom?: boolean;
  room?: Room | undefined;
  loadingRoom?: boolean;
  setIsOnRoom?: Dispatch<SetStateAction<boolean>>;
  localParticipant?: LocalParticipant;
}

export type PublicationType = LocalTrackPublication | RemoteTrackPublication

export type VideoTrackType =
  | LocalVideoTrack
  | RemoteVideoTrack
  | undefined
  | null
