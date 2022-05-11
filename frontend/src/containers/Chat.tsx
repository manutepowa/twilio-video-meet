import { useContext, useEffect, useRef } from 'react'
import { Form } from '../components/Chat/Form'
import { Messages } from '../components/Chat/Messages'
import ChatContext from '../context/ChatContext'

function useChatScroll<T> (dep: T): any {
  const ref = useRef<HTMLDivElement | undefined>()
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
      console.log({
        scrollTop: ref.current.scrollTop,
        scrollHeight: ref.current.scrollHeight
      })
    }
  }, [dep])
  return ref
}

export const Chat = () => {
  const { isChatOpen, messages } = useContext(ChatContext)
  const ref = useChatScroll(messages)

  return (
    <>
      {isChatOpen && (
        <div className="min-w-[400px] text-[#1c194d] bg-slate-900/70 flex flex-col items-center gap-2 ">
          {/* <h1 className="w-full mt-2 py-2 pl-3 font-black text-[#026897] rounded-md bg-slate-50 ">
            CHAT
          </h1> */}
          <div ref={ref} className="w-full pb-12 overflow-y-scroll rounded-md container-messages bg-slate-50">
            <Messages messages={messages} />
          </div>
          <div className="fixed text-center rounded-md bottom-0 w-[370px] right-[22px] bg-slate-50">
            <Form />
          </div>
        </div>
      )}
    </>
  )
}
