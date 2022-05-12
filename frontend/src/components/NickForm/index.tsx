import { FC, FormEvent, useContext } from 'react'
import MeetContext from '../../context/MeetContext'
import { RoomSettings } from '../RoomSettings'
import { Pulsar } from '@uiball/loaders'
import { VoiceDetector } from '../VoiceDetector'
import { motion } from 'framer-motion'

export const NickForm: FC = () => {
  const { nickname, setNickname, enterToRoom, loadingRoom } =
    useContext(MeetContext)
  // const [q, setQ] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nickname === '') {
      return
    }
    enterToRoom?.()
  }

  return (
    <div className="flex flex-col h-screen bg-primary min-w-[400px]">
      <div className="">
        <a href='/' className='flex flex-row justify-start w-full '><img src='/logom3-positivo.svg' alt='logo' className="w-1/3 mx-8 mt-8 " /></a>
        </div>
      <div className="flex flex-col content-center my-auto justify-items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-8 mx-8 space-y-8"
        >
          <label className="text-2xl font-bold tracking-wide fcapitana">Introduzca su nickname</label>
          <input
            type="text"
            name="nickname"
            className="w-full py-2 text-center text-gray-900 rounded-sm"
            value={nickname}
            onChange={(event) => setNickname?.(event.target.value)}
          ></input>
          {loadingRoom
            ? (
            <Pulsar size={40} speed={1.75} color="#fff" />
              )
            : (
              <div className="flex flex-col items-center justify-end w-full h-full">

              <motion.button
                transition={{
                  duration: 0.5
                }}
                type="submit"
                className="items-center justify-center w-full px-4 py-2 font-semibold tracking-wide text-white bg-indigo-500 rounded hover:bg-indigo-700 fcapitana"
                >
                Entrar en la sala
              </motion.button>
                <div className='flex flex-col mt-24 space-y-4'>
              <RoomSettings />
                <VoiceDetector />
                </div>
                </div>
              )}
        </form>
      </div>

    </div>
  )
}
