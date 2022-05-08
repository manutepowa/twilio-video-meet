import { useEffect, useState } from 'react'
import { Participant } from 'twilio-video'

const setBg = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export const useAvatar = (participant: Participant) => {
  // eslint-disable-next-line
  const [username, setUsername] = useState(participant.identity)
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (username) {
      const bg = setBg()
      setUrl(
        `https://ui-avatars.com/api/?name=${username}&background=${bg}&color=fff&size=128`
      )
    }
  }, [username])

  return {
    url
  }
}
