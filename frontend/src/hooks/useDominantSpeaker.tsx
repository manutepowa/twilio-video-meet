import { useContext, useEffect, useState } from 'react'
import { RemoteParticipant } from 'twilio-video'
import MeetContext from '../context/MeetContext'

export const useDominantSpeaker = () => {
  const { room } = useContext(MeetContext)
  const [dominantSpeaker, setDominantSpeaker] = useState(
    room?.dominantSpeaker ?? null
  )

  useEffect(() => {
    if (room) {
      console.log('room connected')
      const handleDominantSpeakerChanged = (
        newDominantSpeaker: RemoteParticipant
      ) => {
        console.log(newDominantSpeaker?.identity)
        setDominantSpeaker(newDominantSpeaker)
      }
      const handleParticipantDisconnected = (
        participant: RemoteParticipant
      ) => {
        setDominantSpeaker((prevDominantSpeaker) => {
          return prevDominantSpeaker === participant
            ? null
            : prevDominantSpeaker
        })
      }

      room.on('dominantSpeakerChanged', handleDominantSpeakerChanged)
      room.on('participantDisconnected', handleParticipantDisconnected)
      return () => {
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged)
        room.off('participantDisconnected', handleParticipantDisconnected)
      }
    }
  }, [room])

  return {
    identity: dominantSpeaker?.identity
  }
}
