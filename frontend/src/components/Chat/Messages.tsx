import { Message } from '@twilio/conversations'
import clsx from 'clsx'
import { useContext, useRef } from 'react'
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

export const Messages = ({ messages }: {messages: Message[] | undefined}) => {
  const { localParticipant } = useContext(MeetContext)

  return (
    <div className=''>
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
