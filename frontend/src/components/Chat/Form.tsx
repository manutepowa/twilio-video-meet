import { useContext, useState } from 'react'
import ChatContext from '../../context/ChatContext'

export const Form = () => {
  const { conversation } = useContext(ChatContext)
  const [value, setValue] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value !== '') {
      conversation?.sendMessage(value.trim())
    }
    setValue('')
  }
  return (
    <form className="flex p-0 mx-1" onSubmit={handleSubmit}>
      <input
        className="w-full px-2 py-2 mx-2 rounded-md"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write your message"
      />
      <button className="px-2 py-2 " type="submit">
        Send
      </button>
    </form>
  )
}
