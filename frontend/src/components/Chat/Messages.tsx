import { useContext } from 'react'
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

export const Messages = () => {
  const { messages } = useContext(ChatContext)
  const { localParticipant } = useContext(MeetContext)
  return (
    <div className='h-full'>
      <div className=''>
        {messages?.map((message, idx) => {
          const date = formatDate(message?.dateCreated)
          const isLocalParticipant = message.author === localParticipant?.identity
          return (
            <div key={idx} className="m-1">
              <div className='flex flex-col py-2 px-3 bg-gray-200 rounded-md'>
                <div className='flex justify-between'>
                  <div className='font-bold'>
                    {message.author}
                    {isLocalParticipant && <span className='text-gray-500'> (me)</span>}
                  </div>
                  <div className='text-xs'>
                    {date}
                  </div>
                </div>
                <div className='text-sm'>{message.body}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
