import { Conversation, Message } from '@twilio/conversations'
import { Dispatch, SetStateAction } from 'react'
import {
  LocalAudioTrack,
  LocalParticipant,
  LocalTrackPublication,
  LocalVideoTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room
} from 'twilio-video'

export interface IChatContext {
  isChatOpen?: boolean
  setIsChatOpen?: Dispatch<SetStateAction<boolean>>
  chatConnect?: (token: string, id: string) => void
  conversation?: Conversation | null
  messages?: Message[]
  haveNewMessages?: boolean
  refNotification?: React.RefObject<HTMLAudioElement>
  setHaveNewMessages?: Dispatch<SetStateAction<boolean>>
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
  audioSetting?: boolean;
  setAudioSetting?: Dispatch<SetStateAction<boolean>>;
  videoSetting?: boolean;
  setVideoSetting?: Dispatch<SetStateAction<boolean>>;
  refAccessSound?: React.RefObject<HTMLAudioElement>;
  setVideoDevice?: Dispatch<SetStateAction<LocalVideoTrack | undefined>>;
  setAudioDevice?: Dispatch<SetStateAction<LocalAudioTrack | undefined>>;
}

export type PublicationType = LocalTrackPublication | RemoteTrackPublication

export type VideoTrackType =
  | LocalVideoTrack
  | RemoteVideoTrack
  | undefined
  | null
