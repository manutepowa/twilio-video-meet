import { useEffect, useRef } from "react"

export const ParticipantTrack = ({ track }: any) => {
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

  return <video className="w-full" ref={ref}></video>
}
