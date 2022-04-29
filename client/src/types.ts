import { Dispatch, SetStateAction } from "react"
import {
  LocalTrackPublication,
  LocalVideoTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
} from "twilio-video"

export interface IContext {
  nickname?: string;
  setNickname?: Dispatch<SetStateAction<string>>;
  setRoomName?: Dispatch<SetStateAction<string>>;
  enterToRoom?: () => void;
  isOnRoom?: boolean;
  room: Room | undefined;
  loadingRoom: boolean;
}

export type PublicationType = LocalTrackPublication | RemoteTrackPublication

export type VideoTrackType = LocalVideoTrack | RemoteVideoTrack
