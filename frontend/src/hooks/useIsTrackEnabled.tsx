import { useEffect, useState } from 'react'
import {
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteAudioTrack,
  RemoteVideoTrack
} from 'twilio-video'

type TrackType =
  | LocalAudioTrack
  | LocalVideoTrack
  | RemoteAudioTrack
  | RemoteVideoTrack
  | undefined

export const useIsTrackEnabled = (track: TrackType) => {
  const [isTrackEnabled, setIsTrackEnabled] = useState(
    track ? track.isEnabled : false
  )

  useEffect(() => {
    if (track) {
      setIsTrackEnabled(track.isEnabled)
      track.on('enabled', () => setIsTrackEnabled(true))
      track.on('disabled', () => setIsTrackEnabled(false))
      return () => {
        track.off('enabled', () => setIsTrackEnabled(true))
        track.off('disabled', () => setIsTrackEnabled(false))
      }
    }
  }, [track])

  return isTrackEnabled
}
