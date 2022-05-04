import { useEffect, useState } from 'react'
import { LocalAudioTrack, LocalParticipant, LocalVideoTrack } from 'twilio-video'

type Props = LocalParticipant | undefined 


export const useToggleActions = (localParticipant: Props) => {
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack>()
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>()
  const [isAudioEnabled, setIsAudioEnabled] = useState(localAudioTrack?.isEnabled)
  const [isVideoEnabled, setIsVideoEnabled] = useState(localVideoTrack?.isEnabled)
  
  const muteAudio = () => {
    localAudioTrack?.isEnabled ? localAudioTrack?.disable() : localAudioTrack?.enable()
    setIsAudioEnabled(localAudioTrack?.isEnabled)
  }
  const disableVideo = () => {
    localVideoTrack?.isEnabled ? localVideoTrack?.disable() : localVideoTrack?.enable()
    setIsVideoEnabled(localVideoTrack?.isEnabled)
  }
  
  useEffect(() => {
    localParticipant?.audioTracks.forEach(({ track }: {track: LocalAudioTrack}) => {
      setLocalAudioTrack(track)
      setIsAudioEnabled(track.isEnabled)
    })
    // each videorack is a track
    localParticipant?.videoTracks.forEach(({ track }: {track: LocalVideoTrack}) => {
      setLocalVideoTrack(track)
      setIsVideoEnabled(track.isEnabled)
    })
  }, [localParticipant?.audioTracks, localParticipant?.videoTracks])
  
  return {
    localAudio: {
      muteAudio,
      isAudioEnabled
    },
    localVideo: {
      disableVideo,
      isVideoEnabled
    }
  }
}
