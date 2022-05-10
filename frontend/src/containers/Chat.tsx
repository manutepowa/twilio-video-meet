import { useContext } from 'react'
import { Form } from '../components/Chat/Form'
import { Messages } from '../components/Chat/Messages'
import ChatContext from '../context/ChatContext'

export const Chat = () => {
  const { isChatOpen } = useContext(ChatContext)

  return (
    <>
      {isChatOpen && (
        <div className="min-w-[400px] p-2 text-black bg-gray-300 flex flex-col items-center gap-2">
          <h1 className="py-2 rounded-md bg-sky-100 w-full text-center font-bold">
            CHAT
          </h1>
          <div className="flex-1 py-2 rounded-md bg-sky-100 w-full">
            <Messages />
          </div>
          <div className="rounded-md bg-sky-100 w-full text-center">
            <Form />
          </div>
        </div>
      )}
    </>
  )
}
