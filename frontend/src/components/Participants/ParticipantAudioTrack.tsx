import { useEffect, useRef } from 'react'

export const ParticipantAudioTrack = ({ track }: any) => {
  const ref = useRef<HTMLAudioElement>(null)
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

  return <audio className="w-full" ref={ref}></audio>
}
