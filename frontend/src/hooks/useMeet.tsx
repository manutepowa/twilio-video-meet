import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import getMeetToken from '../services/getToken'
import * as Video from 'twilio-video'
import ChatContext from '../context/ChatContext'

export const useMeet = () => {
  const [nickname, setNickname] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')
  const [room, setRoom] = useState<Video.Room>()
  const [isOnRoom, setIsOnRoom] = useState<boolean>(false)
  const [loadingRoom, setLoadingRoom] = useState<boolean>(false)
  const [audioSetting, setAudioSetting] = useState<boolean>(true)
  const [videoSetting, setVideoSetting] = useState<boolean>(true)
  const [localParticipant, setLocalParticipant] = useState<Video.LocalParticipant>()
  const refAccessSound = useRef<HTMLAudioElement>(null)

  const { chatConnect } = useContext(ChatContext)

  const enterToRoom = useCallback(async () => {
    setLoadingRoom(true)
    // eslint-disable-next-line
    const { token, conversation_sid } = await getMeetToken(nickname, roomName)
    const connection = await Video.connect(token, {
      dominantSpeaker: true
    })
    setRoom(connection)
    setLocalParticipant(connection.localParticipant)
    setIsOnRoom(true)
    setLoadingRoom(false)
    chatConnect?.(token, conversation_sid)
    window.addEventListener('beforeunload', () => {
      connection.disconnect()
    })
  }, [nickname, roomName, chatConnect, audioSetting, videoSetting])

  useEffect(() => {
    if (isOnRoom) {
      localParticipant?.audioTracks.forEach(
        ({ track }: { track: Video.LocalAudioTrack }) => {
          audioSetting ? track.enable() : track.disable()
        }
      )
      localParticipant?.videoTracks.forEach(
        ({ track }: { track: Video.LocalVideoTrack }) => {
          audioSetting ? track.enable() : track.disable()
        }
      )
    }
  }, [localParticipant])

  useEffect(() => {
    if (isOnRoom) {
      refAccessSound.current?.play()
    }
  }, [isOnRoom])

  return {
    nickname,
    setNickname,
    setRoomName,
    enterToRoom,
    isOnRoom,
    room,
    loadingRoom,
    setIsOnRoom,
    localParticipant,
    audioSetting,
    setAudioSetting,
    videoSetting,
    setVideoSetting,
    refAccessSound
  }
}
