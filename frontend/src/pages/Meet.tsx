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
              <div className='w-1/2 p-5 my-16 space-y-2 rounded-xl'>
                <h1 className=' shadow-xl backdrop-filter backdrop-blur-md mt-3 text-2xl text-[#343090] bg-indigo-100/60 rounded-lg px-6 py-4 font-bold fcapitana tracking-wide'>Bienvenido a la sala:<br /><p className='text-4xl lowercase'>{roomName}</p></h1>
                {/* <div className=' shadow-xl backdrop-filter backdrop-blur-md mt-3 text-2xl text-[#343090] bg-indigo-100/60 rounded-lg px-6 py-4 font-bold'>dafasdf</div> */}
              </div>

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
