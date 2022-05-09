import { Client, Conversation, Message } from '@twilio/conversations'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { IChatContext } from '../types'

const ChatContext = createContext<IChatContext>({})

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [client, setClient] = useState<Client>()
  const [sid, setSid] = useState<string>()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const chatConnect = useCallback(async (token: string, id: string) => {
    console.log('connecting to chat...')
    const chatClient = await Client.create(token)
    setClient(chatClient)
    setSid(id)
  }, [])
  useEffect(() => {
    if (conversation) {
      const handleMessageAdded = (message: Message) => setMessages(oldMessages => [...oldMessages, message])
      conversation.getMessages().then(newMessages => setMessages(newMessages.items))
      conversation.on('messageAdded', handleMessageAdded)
      return () => {
        conversation.off('messageAdded', handleMessageAdded)
      }
    }
  }, [conversation])

  useEffect(() => {
    if (client && sid) {
      client.getConversationBySid(sid)
        .then(newConversation => {
          setConversation(newConversation)
        }).catch(e => console.error(e))
    }
  }, [client, sid])

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        chatConnect,
        conversation,
        messages
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider }
export default ChatContext
