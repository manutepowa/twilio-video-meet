import { useContext } from "react"
import { Participant } from "../../components/Participants/Participant"
import MeetContext from "../../context/MeetContext"
import { useParticipants } from "../../hooks/useParticipants"

function Room() {
  const participants = useParticipants()
  const { room } = useContext(MeetContext)
  const localParticipant = room?.localParticipant

  return (
    <div className="bg-primary h-screen">
      <div className="grid grid-cols-3 gap-4 p-4">
        {localParticipant && (
          <Participant
            participant={localParticipant}
            isLocalParticipant={true}
          />
        )}
        {participants &&
          participants.map((participant, i) => (
            <Participant
              key={i}
              participant={participant}
              isLocalParticipant={false}
            />
          ))}
      </div>
      <div>
        <button type="button" onClick={() => room?.disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default Room
