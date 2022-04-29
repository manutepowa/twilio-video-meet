import { useContext, useEffect } from "react"
import { useRoute } from "wouter"
import { NickForm } from "../components/NickForm"
import UserVideo from "../components/UserVideo"
import Room from "../containers/Room"
import MeetContext from "../context/MeetContext"

function Meet() {
  const [match, params] = useRoute("/:roomName")
  const { setRoom, isOnRoom } = useContext(MeetContext)
  const roomName = params?.roomName ?? ""

  useEffect(() => {
    if (roomName) {
      setRoom?.(roomName)
    }
  }, [roomName])

  return (
    <div className="bg-gray-200">
      {!isOnRoom ? (
        <div className="flex flex-auto">
          <NickForm />
          <UserVideo />
        </div>
      ) : (
        <Room />
      )}
    </div>
  )
}

export default Meet
