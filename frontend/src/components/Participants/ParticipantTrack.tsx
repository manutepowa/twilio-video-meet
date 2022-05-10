import { useEffect, useRef } from 'react'
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'
import clsx from 'clsx'

type Props = {
  track: LocalVideoTrack | RemoteVideoTrack | undefined
  imDominantSpeaker: boolean
  grid: number
}

export const ParticipantTrack = ({ track, imDominantSpeaker, grid }: Props) => {
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
    <div className="w-full h-full border-2 rounded-md">
      <video
        className={`h-full border-2 rounded-md w-full ${
          imDominantSpeaker ? 'border-[#44c2fd]' : 'border-gray-800'
        }` }
        ref={ref}
      ></video>
    </div>
  )
}
