import { Message } from '@twilio/conversations'
import { useContext, useEffect, useRef } from 'react'
import { Form } from '../components/Chat/Form'
import { Messages } from '../components/Chat/Messages'
import ChatContext from '../context/ChatContext'
import { AnimatePresence, motion } from 'framer-motion'

function useChatScroll (dep?: Message[], isChatOpen?: boolean): any {
  const ref = useRef<HTMLDivElement | undefined>()
  useEffect(() => {
    if (ref.current && isChatOpen) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep, isChatOpen])
  return ref
}

export const Chat = () => {
  const { isChatOpen, messages, refNotification } = useContext(ChatContext)
  const ref = useChatScroll(messages, isChatOpen)

  return (
    <>

      {isChatOpen && (
       <div className="w-full min-w-[392px] md:w-auto text-[#1c194d] bg-slate-900/70 flex flex-col items-center gap-2 ">
          {/* <h1 className="w-full mt-2 py-2 pl-3 font-black text-[#026897] rounded-md bg-slate-50 ">
            CHAT
          </h1> */}
          <motion.div ref={ref} className="w-full pb-16 overflow-y-scroll bg-indigo-200/60 container-messages"
            initial={{
              width: 0
            }}
            animate={{
              width: 392
            }}
            exit={{
              width: 0

            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut'
            }}>
            <Messages messages={messages} />
          </motion.div>
          <div className="fixed text-center rounded-md bottom-0 w-[375px] right-[18px] ">
            <Form />
          </div>
        </div>
      )}
      <audio ref={refNotification} src="/notification.mp3"></audio>

    </>
  )
}
