import { useContext, useEffect, useRef, useState } from 'react'
import { createLocalVideoTrack, LocalTrack, LocalVideoTrack } from 'twilio-video'
import MeetContext from '../../context/MeetContext'

function UserVideo () {
  const { videoSetting } = useContext(MeetContext)
  const ref = useRef<HTMLDivElement>(null)
  const [trackElement, setTrackElement] = useState<LocalVideoTrack>()

  useEffect(() => {
    const addLocalTrack = async () => {
      const track: LocalTrack = await createLocalVideoTrack()
      setTrackElement(track)
      ref.current && ref.current.appendChild(track.attach())
    }

    if (ref?.current !== null) {
      addLocalTrack()
    }
  }, [])

  useEffect(() => {
    trackElement?.enable(!!videoSetting)
  }, [videoSetting, trackElement])
  return (
    <div className="flex max-w-sm md:mt-12">
      <div ref={ref}></div>
    </div>
  )
}

export default UserVideo
