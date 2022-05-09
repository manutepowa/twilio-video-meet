import React, { useContext } from 'react'
import ChatContext from '../../context/ChatContext'

export const Messages = () => {
  const { messages } = useContext(ChatContext)
  return (
    <div className='bg-red-300 h-full'>
      <div className=''>
        {messages?.reverse().map((message, idx) => {
          console.log({ m: message.author, b: message.body })
          return (
            <div key={idx} className="bg-gray-200 my-2">
              <div className=''>
                <span>{message.author}</span>
                <span>{message.body}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
