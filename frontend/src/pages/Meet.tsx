import { useContext, useEffect } from "react"
import { useRoute } from "wouter"
import { NickForm } from "../components/NickForm"
import UserVideo from "../components/UserVideo"
import { Chat } from "../containers/Chat"
import Room from "../containers/Room"
import MeetContext from "../context/MeetContext"

function Meet() {
  const [match, params] = useRoute("/:roomName")
  const { setRoomName, isOnRoom } = useContext(MeetContext)
  const roomName = params?.roomName ?? ""

  useEffect(() => {
    if (roomName) {
      setRoomName?.(roomName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName])

  return (
    <div className="bg-gray-200">
      {!isOnRoom ? (
        <div className="flex flex-auto">
          <NickForm />
          <UserVideo />
        </div>
      ) : (
        <div className="flex">
          <Room />
          <Chat />
        </div>
      )}
    </div>
  )
}

export default Meet
