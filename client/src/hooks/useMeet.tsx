import { useState } from "react"
import getMeetToken from "../services/getToken"
import * as Video from "twilio-video"

export const useMeet = () => {
  const [nickname, setNickname] = useState<string>("")
  const [roomName, setRoomName] = useState<string>("")
  const [room, setRoom] = useState<Video.Room>()
  const [isOnRoom, setIsOnRoom] = useState<boolean>(false)

  const enterToRoom = async () => {
    const token = await getMeetToken(nickname, roomName)
    const connection = await Video.connect(token)
    setRoom(connection)
    setIsOnRoom(true)
  }

  return {
    nickname,
    setNickname,
    setRoomName,
    enterToRoom,
    isOnRoom,
    room,
  }
}
