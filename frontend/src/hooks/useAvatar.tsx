import { useEffect, useState } from 'react'
import { Participant } from 'twilio-video'

const setBg = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export const useAvatar = (participant: Participant) => {
  // eslint-disable-next-line
  const [username, setUsername] = useState(participant.identity)
  const [url, setUrl] = useState('')
  const [fondo, setFondo] = useState(setBg())
  useEffect(() => {
    if (username) {
      setUrl(
        `https://ui-avatars.com/api/?name=${username}&background=${fondo}&color=fff&size=128`
      )
    }
  }, [username, fondo])

  return {
    url,
    fondo
  }
}
