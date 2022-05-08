import { useEffect, useRef } from 'react'
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'

type Props = {
  track: LocalVideoTrack | RemoteVideoTrack | undefined
  imDominantSpeaker: boolean
}

export const ParticipantTrack = ({ track, imDominantSpeaker }: Props) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref?.current
    if (track && el !== null) {
      track.attach(el)
      // ref.current && ref.current.appendChild(track.attach())
      return () => {
        track.detach(el)
        el.srcObject = null
      }
    }
  }, [track])

  return (
    <div className="w-full h-full">
      <video
        className={`h-full border-2 rounded-md ${
          imDominantSpeaker ? 'border-sky-500' : 'border-primary'
        }`}
        ref={ref}
      ></video>
    </div>
  )
}
