import { useContext } from 'react'
import { Form } from '../components/Chat/Form'
import { Messages } from '../components/Chat/Messages'
import ChatContext from '../context/ChatContext'

export const Chat = () => {
  const { isChatOpen } = useContext(ChatContext)

  return (
    <>
      {isChatOpen && (
        <div className="min-w-[400px] text-[#1c194d] bg-slate-900/70 flex flex-col items-center gap-2 ">
          <h1 className="w-full mt-2 py-2 pl-3 font-black text-[#026897] rounded-md bg-slate-50 ">
            CHAT
          </h1>
          <div className="w-full pb-12 overflow-y-auto rounded-md bg-slate-50">
            <Messages />
          </div>
          <div className="fixed text-center rounded-md bottom-0 w-[370px] right-[22px] bg-slate-50">
            <Form />
          </div>
        </div>
      )}
    </>
  )
}
