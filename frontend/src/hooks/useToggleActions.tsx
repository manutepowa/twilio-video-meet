import { useEffect, useState, useContext } from 'react'
import {
  LocalAudioTrack,
  LocalParticipant,
  LocalVideoTrack
} from 'twilio-video'
import MeetContext from '../context/MeetContext'

type Props = LocalParticipant | undefined

export const useToggleActions = (localParticipant: Props) => {
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack>()
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>()
  const { audioSetting, setAudioSetting, videoSetting, setVideoSetting } = useContext(MeetContext)

  const muteAudio = () => {
    localAudioTrack?.isEnabled
      ? localAudioTrack?.disable()
      : localAudioTrack?.enable()
    setAudioSetting?.(!!localAudioTrack?.isEnabled)
  }
  const disableVideo = () => {
    localVideoTrack?.isEnabled
      ? localVideoTrack?.disable()
      : localVideoTrack?.enable()
    setVideoSetting?.(!!localVideoTrack?.isEnabled)
  }

  useEffect(() => {
    localParticipant?.audioTracks.forEach(
      ({ track }: { track: LocalAudioTrack }) => {
        setLocalAudioTrack(track)
      }
    )
    // each videorack is a track
    localParticipant?.videoTracks.forEach(
      ({ track }: { track: LocalVideoTrack }) => {
        setLocalVideoTrack(track)
      }
    )
  }, [localParticipant])

  return {
    localAudio: {
      muteAudio,
      audioSetting
    },
    localVideo: {
      disableVideo,
      videoSetting
    }
  }
}
