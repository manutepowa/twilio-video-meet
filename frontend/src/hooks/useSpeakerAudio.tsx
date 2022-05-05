import { useEffect, useState } from 'react'
import { LocalAudioTrack, LocalVideoTrack, RemoteAudioTrack, RemoteVideoTrack } from 'twilio-video'

type TrackType = LocalAudioTrack | LocalVideoTrack | RemoteAudioTrack | RemoteVideoTrack | undefined 

export const useSpeakerAudio = (track: TrackType) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(track ? track.isEnabled : false)
  
  useEffect(() => {
    if (track) {
      setIsAudioEnabled(track.isEnabled)
      track?.on('enabled', () => setIsAudioEnabled(true))
      track?.on('disabled', () => setIsAudioEnabled(false))
      return () => {
        track?.off('enabled', () => setIsAudioEnabled(true))
        track?.off('disabled', () => setIsAudioEnabled(false));
      };
    }
  }, [track])

  return isAudioEnabled
}
