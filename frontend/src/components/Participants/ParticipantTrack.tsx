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
      <video
        className={clsx('rounded-md border-2', {

          'md:h-screen md:w-auto md:my-0 md:mx-auto': grid === 1,
          'md:h-auto md:w-full': grid === 2,
          'md:h-1/2 h-1/3 ': grid <= 6 && grid > 2,
          'md:h-1/3 h-1/3 ': grid > 6 && grid <= 9
          // 'h-1/4 ': grid > 9 && grid <= 12

        }, imDominantSpeaker ? 'border-[#44c2fd]' : 'border-gray-800')}
        ref={ref}
      ></video>

  )
}
