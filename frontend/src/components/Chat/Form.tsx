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
    <form className="flex flex-row justify-center w-full p-0 bg-transparent" onSubmit={handleSubmit}>
      <input
        className="text-sm w-full ml-3 font-medium placeholder-opacity-50 rounded-tl-md rounded-bl-md transition pl-2 duration-200 border-opacity-50 outline-none bg-[#f8f5ff] text-stone-400 placeholder-stone-800 focus:placeholder-[#026897] focus:border-emerald-400"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" Escribe tu mensaje"
      />
      <button className="px-4 py-3 mr-3 font-semibold text-white bg-indigo-900 rounded-tr-lg rounded-br-lg hover:bg-indigo-700" type="submit">
        Enviar
      </button>
    </form>
  )
}
