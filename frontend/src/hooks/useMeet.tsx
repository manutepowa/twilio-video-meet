import { useState } from 'react'
import getMeetToken from '../services/getToken'
import * as Video from 'twilio-video'

export const useMeet = () => {
  const [nickname, setNickname] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')
  const [room, setRoom] = useState<Video.Room>()
  const [isOnRoom, setIsOnRoom] = useState<boolean>(false)
  const [loadingRoom, setLoadingRoom] = useState<boolean>(false)
  const [localParticipant, setLocalParticipant] =
    useState<Video.LocalParticipant>()

  const enterToRoom = async () => {
    setLoadingRoom(true)
    const token = await getMeetToken(nickname, roomName)
    const connection = await Video.connect(token, {
      video: true,
      audio: true,
      dominantSpeaker: true
    })
    setRoom(connection)
    setLocalParticipant(connection.localParticipant)
    setIsOnRoom(true)
    setLoadingRoom(false)
    window.addEventListener('beforeunload', () => {
      connection.disconnect()
    })
  }

  return {
    nickname,
    setNickname,
    setRoomName,
    enterToRoom,
    isOnRoom,
    room,
    loadingRoom,
    setIsOnRoom,
    localParticipant
  }
}
