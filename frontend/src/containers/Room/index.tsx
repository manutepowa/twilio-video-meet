import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { Participant } from '../../components/Participants/Participant'
import { RoomActions } from '../../components/RoomActions/RoomActions'
import MeetContext from '../../context/MeetContext'
import { useParticipants } from '../../hooks/useParticipants'

function Room () {
  const participants = useParticipants()
  const { room, refAccessSound } = useContext(MeetContext)
  const localParticipant = room?.localParticipant
  const aux = participants.length + 1
  return (
    <div className="w-full min-h-screen bg-repeat bg-stone-900/90">
      <div className="flex flex-wrap ">
        <AnimatePresence>
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
          </AnimatePresence>
      </div>
      <RoomActions />
      <audio ref={refAccessSound} src="/access_meet.mp3"></audio>
    </div>
  )
}

export default Room
