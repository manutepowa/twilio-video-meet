import { createContext, ReactNode, useState } from 'react'
import { IChatContext } from '../types'

const ChatContext = createContext<IChatContext>({})

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider }
export default ChatContext
