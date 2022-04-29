import { useEffect, useRef } from "react"
import { VideoTrackType } from "../../types"

export type TrackProps = {
  track: VideoTrackType,
}
export const ParticipantTrack = ({ track }: TrackProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (track && ref?.current !== null) {
      console.log("track", track)
      ref.current && ref.current.appendChild(track.attach())
    }
  }, [track])

  return <div className="room-video" ref={ref}></div>
}
