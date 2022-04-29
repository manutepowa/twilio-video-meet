import { useContext, useEffect, useState } from "react"
import { RemoteParticipant } from "twilio-video"
import MeetContext from "../context/MeetContext"

export const useParticipants = () => {
  const { room } = useContext(MeetContext)
  const [participants, setParticipants] = useState<RemoteParticipant[]>(
    Array.from(room?.participants.values() ?? [])
  )

  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant])
      console.log("Participant connected:", participant.identity)
    }
    const participantDisconnected = (participant: RemoteParticipant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      )
      console.log("Participant disconnected:", participant.identity)
    }
    if (room) {
      room.on("participantConnected", participantConnected)
      room.on("participantDisconnected", participantDisconnected)
    }
  }, [room])

  return participants
}
