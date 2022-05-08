import { useContext, useEffect, useRef } from 'react'
import { createLocalVideoTrack, LocalTrack } from 'twilio-video'

function UserVideo () {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const addLocalTrack = async () => {
      const track: LocalTrack = await createLocalVideoTrack()
      ref.current && ref.current.appendChild(track.attach())
    }
    if (ref?.current !== null) {
      // addLocalTrack()
    }
  }, [])
  return (
    <div className="flex flex-col !h-screen !w-full">
      <div id="local-video" ref={ref}></div>
    </div>
  )
}

export default UserVideo
