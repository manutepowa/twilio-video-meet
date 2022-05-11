import clsx from 'clsx'
import React, { useContext, useEffect, useRef } from 'react'
import ChatContext from '../../context/ChatContext'
import MeetContext from '../../context/MeetContext'

function formatDate (date: Date | null) {
  const hours = String(date?.getHours()).padStart(2, '0')
  const minutes = String(date?.getMinutes()).padStart(2, '0')
  const seconds = String(date?.getSeconds()).padStart(2, '0')

  const day = date?.getDate()
  const month = date?.getMonth()
  const year = date?.getFullYear()
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

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

export const Messages = () => {
  const { messages } = useContext(ChatContext)
  const { localParticipant } = useContext(MeetContext)

  const ref = useChatScroll(messages)
  return (
    <div className='h-full' ref={ref}>
        {messages?.map((message, idx) => {
          const date = formatDate(message?.dateCreated)
          const isLocalParticipant = message.author === localParticipant?.identity
          return (
            <div key={idx} className="m-2">
              <div className={clsx('flex flex-col px-3 py-2 my-2 rounded-md', {

                'bg-slate-100': isLocalParticipant,
                'bg-slate-200': !isLocalParticipant

              })}>
                <div className='flex justify-between'>

                  <div className='font-bold text-[#026897]'>
                    {message.author}
                    {isLocalParticipant && <span className='text-[#026897] text-sm'> (me)</span>}
                  </div>
                  <div className='text-xs'>
                    {date}
                  </div>
                </div>
                <div className='mt-1 text-sm'>{message.body}</div>
              </div>
            </div>
          )
        })}
      </div>
  )
}
