import { useEffect, useRef } from "react"
import { VideoTrackType } from "../../types"

export type TrackProps = {
  track: VideoTrackType,
}
export const ParticipantTrack = ({ track }: TrackProps) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref?.current
    if (track && el !== null) {
      console.log("track", track)
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
