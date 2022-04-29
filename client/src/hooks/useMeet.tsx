import { useEffect, useState } from "react"
import getMeetToken from "../services/getToken"
import * as Video from "twilio-video"

export const useMeet = () => {
  const [nickname, setNickname] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [meet, setMeet] = useState<Video.Room>()
  const [isOnRoom, setIsOnRoom] = useState<boolean>(false)
  // const [participants, setParticipants] = useState<string[]>([])
  const enterToRoom = async () => {
    console.log({ nickname, room })
    const token = await getMeetToken(nickname, room)
    console.log("token", token)
    await Video.connect(token).then((room) => {
      console.log("room", room)
      setMeet(room)
    })
  }

  return {
    nickname,
    setNickname,
    setRoom,
    enterToRoom,
    isOnRoom,
  }
}
