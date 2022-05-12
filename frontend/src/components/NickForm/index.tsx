import { FC, FormEvent, useContext } from 'react'
import MeetContext from '../../context/MeetContext'
import { Pulsar } from '@uiball/loaders'
import { VoiceDetector } from '../VoiceDetector'

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
        <a href='/' className='flex flex-row justify-center w-full '><img src='/logom3-positivo.svg' alt='logo' className="w-1/2 mt-8 " /></a>
        </div>
      <div className="flex flex-col content-center my-auto justify-items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-8 mx-8"
        >
          <label className="text-2xl font-bold">Introduzca su nickname</label>
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
            <button
              type="submit"
              className="w-full py-2 my-4 font-semibold rounded-sm bg-sky-500 hover:bg-sky-400"
            >
              Entrar a la sala
            </button>
              )}
        </form>
      </div>
      <VoiceDetector />
    </div>
  )
}
