import { useContext, useEffect } from 'react'
import { useRoute } from 'wouter'
import { NickForm } from '../components/NickForm'
import UserVideo from '../components/UserVideo'
import { Chat } from '../containers/Chat'
import Room from '../containers/Room'
import MeetContext from '../context/MeetContext'

function Meet () {
  // eslint-disable-next-line
  const [match, params] = useRoute('/:roomName')
  const { setRoomName, isOnRoom } = useContext(MeetContext)
  const roomName = params?.roomName ?? ''

  useEffect(() => {
    if (roomName) {
      setRoomName?.(roomName)
    }
    // eslint-disable-next-line
  }, [roomName])

  return (
    <div className="bg-[url('../public/fondo-def.jpg')] bg-cover bg-center-center bg-no-repeat">
      <div className='' >
      {!isOnRoom
        ? (
        <div className="flex flex-auto">
          <NickForm />
          <UserVideo />

              <div className='w-1/2 p-5 bg-white rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg'></div>
        </div>
          )
        : (
        <div className="flex">
          <Room />
          <Chat />
        </div>
          )}
          </div>
    </div>
  )
}

export default Meet
