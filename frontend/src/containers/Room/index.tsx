import { useContext } from 'react'
import { RemoteParticipant } from 'twilio-video'
import { Participant } from '../../components/Participants/Participant'
import { RoomActions } from '../../components/RoomActions/RoomActions'
import MeetContext from '../../context/MeetContext'
import { useParticipants } from '../../hooks/useParticipants'

function Room () {
  const participants = useParticipants()
  const { room } = useContext(MeetContext)
  const localParticipant = room?.localParticipant
  const [numparticipants, setNumparticipants] = participants
  const aux = participants.length + 1

  const shape = Math.round(Math.sqrt(aux))
  console.log({ shape })
  const result = `grid-cols-${shape} grid-rows-${shape}`

  return (
    <div className="w-full h-screen bg-indigo-900/90">
      <div className={`grid h-[100%] grid-flow-col ${result} gap-4  min-w-full`}>
        {localParticipant && (
          <Participant
            grid={aux}
            participant={localParticipant}
            isLocalParticipant={true}
          />
        )}
        {participants &&
          participants.map((participant, i) => (
            <Participant
              grid= {aux}
              key={i}
              participant={participant}
              isLocalParticipant={false}
            />
          ))}
      </div>
      <RoomActions />
    </div>
  )
}

export default Room
