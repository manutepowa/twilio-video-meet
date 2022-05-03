import { useEffect, useState } from 'react'
import { LocalAudioTrack, LocalParticipant, LocalVideoTrack } from 'twilio-video'

type Props = LocalParticipant | undefined 


export const useToggleActions = (localParticipant: Props) => {
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack>()
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>()
  const [isMuted, setIsMuted] = useState(localAudioTrack?.isEnabled)
  const [isVideoEnabled, setIsVideoEnabled] = useState(localVideoTrack?.isEnabled)
  
  const muteAudio = () => {
    localAudioTrack?.isEnabled ? localAudioTrack?.disable() : localAudioTrack?.enable()
    setIsMuted(localAudioTrack?.isEnabled)
  }
  const disableVideo = () => {
    localVideoTrack?.isEnabled ? localVideoTrack?.disable() : localVideoTrack?.enable()
    setIsVideoEnabled(localVideoTrack?.isEnabled)
  }
  
  useEffect(() => {
    localParticipant?.audioTracks.forEach(({ track }: any) => {
      setLocalAudioTrack(track)
    })
    // each videorack is a track
    localParticipant?.videoTracks.forEach(({ track }: any) => {
      setLocalVideoTrack(track)
    })
  }, [localParticipant?.audioTracks, localParticipant?.videoTracks])
  
  return {
    localAudio: {
      muteAudio,
      isMuted
    },
    localVideo: {
      disableVideo,
      isVideoEnabled
    }
  }
}
