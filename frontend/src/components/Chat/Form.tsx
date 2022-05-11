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
    <form className="flex flex-row justify-between w-full p-0 mx-1" onSubmit={handleSubmit}>
      <input
        className="text-sm w-full ml-3 font-medium placeholder-opacity-50 transition duration-200 border-opacity-50 outline-none bg-[#f8f5ff] text-stone-400 placeholder-stone-800 focus:placeholder-[#026897] focus:border-emerald-400"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" Escribe tu mensaje"
      />
      <button className="py-2 px-4 rounded-tr-lg rounded-br-lg mr-3 text-white font-semibold bg-[#026897]" type="submit">
        Send
      </button>
    </form>
  )
}
