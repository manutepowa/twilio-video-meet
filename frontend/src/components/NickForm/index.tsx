import { FC, FormEvent, useContext, useState } from "react"
import MeetContext from "../../context/MeetContext"
import { LoadingRoom } from "./LoadingRoom"

export const NickForm: FC = () => {
  const { nickname, setNickname, enterToRoom, loadingRoom } =
    useContext(MeetContext)
  // const [q, setQ] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nickname === "") {
      return
    }
    enterToRoom?.()
  }

  return (
    <div className="flex flex-col h-screen bg-primary w-[450px]">
      <div className="flex flex-col my-auto justify-items-center content-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-8 mx-8"
        >
          <label className="text-2xl font-bold">Enter username</label>
          <input
            type="text"
            name="nickname"
            className="w-full rounded-sm py-2 text-gray-900 text-center"
            value={nickname}
            onChange={(event) => setNickname?.(event.target.value)}
          ></input>
          {loadingRoom ? (
            <LoadingRoom />
          ) : (
            <button
              type="submit"
              className="w-full py-2 my-4 rounded-sm bg-sky-500 hover:bg-sky-400"
            >
              Access room
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
