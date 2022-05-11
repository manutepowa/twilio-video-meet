import { FormEvent, useState } from 'react'
import { useLocation } from 'wouter'

function Home () {
  const [path, setPath] = useState<string>('')
  const [location, setLocation] = useLocation()
  const acceder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (path !== '') {
      setLocation(path)
      setPath('')
    }
  }
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen text-indigo-600 bg-neutral-200">
      <div className="flex flex-col">
        <img src="logom3.svg" alt="logom3" />
        <form className="!appearance-none my-12 " onSubmit={acceder}>
          <span className='flex flex-row items-end'>
            <button className="w-4 h-[48px] rounded-tl-md rounded-bl-md pl-3 pr-4 bg-indigo-500 shadow-lg appearance-none text-stone-50">/</button>
            <input type="text" value={path} onChange={(e) => setPath(e.target.value.replace(/\//g, ''))} size={60} placeholder="Nombre de la sala" className="h-[48px] px-3 -mt-2 text-sm font-medium placeholder-opacity-50 transition duration-200  border-opacity-50 shadow-xl outline-none sm:px-2 bg-stone-50 text-stone-400 placeholder-stone-800 focus:placeholder-emerald-300 focus:border-emerald-400" />
            <button className="h-[48px] px-6 bg-indigo-500 rounded-tr-lg rounded-br-lg shadow-xl appearance-none hover:bg-indigo-700 text-stone-100" type='submit'>acceder</button>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Home
