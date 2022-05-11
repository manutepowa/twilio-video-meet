import { Client, Conversation, Message } from '@twilio/conversations'
import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { IChatContext } from '../types'

const ChatContext = createContext<IChatContext>({})

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [client, setClient] = useState<Client>()
  const [sid, setSid] = useState<string>()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [haveNewMessages, setHaveNewMessages] = useState<boolean>(false)
  const refNotification = useRef<HTMLAudioElement>(null)

  const chatConnect = useCallback(async (token: string, id: string) => {
    console.log('connecting to chat...')
    const chatClient = await Client.create(token)
    setClient(chatClient)
    setSid(id)
  }, [])

  useEffect(() => {
    if (conversation) {
      const handleMessageAdded = (message: Message) => {
        setMessages(oldMessages => [...oldMessages, message])
        // !isChatOpen && !haveNewMessages && refNotification.current && refNotification.current.play()
        if (!isChatOpen && !haveNewMessages) {
          console.log('new message')
          refNotification.current && refNotification.current.play()
          setHaveNewMessages(true)
        }
      }
      conversation.getMessages().then(newMessages => setMessages(newMessages.items))
      conversation.on('messageAdded', handleMessageAdded)
      return () => {
        conversation.off('messageAdded', handleMessageAdded)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, isChatOpen, haveNewMessages])

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
        messages,
        haveNewMessages,
        refNotification,
        setHaveNewMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatProvider }
export default ChatContext
