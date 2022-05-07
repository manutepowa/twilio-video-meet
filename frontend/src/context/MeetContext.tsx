import { createContext, ReactNode } from "react"
import { useMeet } from "../hooks/useMeet"
import { IContext } from "../types"

const MeetContext = createContext<IContext>({})

const MeetProvider = ({ children }: { children: ReactNode }) => {
  const meetData: IContext = useMeet()

  return (
    <MeetContext.Provider value={meetData}>{children}</MeetContext.Provider>
  )
}

export { MeetProvider }
export default MeetContext
