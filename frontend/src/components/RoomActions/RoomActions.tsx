import { useContext } from 'react'
import MeetContext from '../../context/MeetContext'
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiPhoneOff,
  BiVideo,
  BiVideoOff,
  BiMessageDetail,
  BiMessageX
} from 'react-icons/bi'
import { useToggleActions } from '../../hooks/useToggleActions'
import ChatContext from '../../context/ChatContext'

const iconsStyle = 'text-white text-2xl'

export const RoomActions = () => {
  const { room, localParticipant } = useContext(MeetContext)
  const { setIsChatOpen, isChatOpen, haveNewMessages, setHaveNewMessages } = useContext(ChatContext)
  const { localAudio, localVideo } = useToggleActions(localParticipant)

  return (
    <div className="absolute bottom-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2">
      <div className="flex gap-1 bg-black rounded-md">
        <div className="action-buttons">
          <div className='p-0 m-0 tooltip'>
            <button type="button" onClick={() => localAudio.muteAudio()}>
              {localAudio.isAudioEnabled
                ? (
                <BiMicrophone className={iconsStyle} />

                  )
                : (
                    <BiMicrophoneOff className={iconsStyle} />

                  )}
              </button>{localAudio.isAudioEnabled ? (<span className='tooltiptext'>Silenciar</span>) : (<span className='tooltiptext'>Activar</span>)}
          </div>

        </div>
        <div className="action-buttons">
          <div className='p-0 m-0 tooltip'>
          <button type="button" onClick={() => localVideo.disableVideo()}>
            {localVideo.isVideoEnabled
              ? (

                  <BiVideo className={iconsStyle} />

                )
              : (

                  <BiVideoOff className={iconsStyle} />

                )}
          </button>{localVideo.isVideoEnabled ? (<span className='tooltiptext'>Apagar</span>) : (<span className='tooltiptext'>Encender</span>)}
          </div>
        </div>
        <div className="action-buttons">
          <div className='p-0 m-0 tooltip'>
          <button type="button" onClick={() => {
            setIsChatOpen?.(!isChatOpen)
            setHaveNewMessages?.(false)
          }}>
            {!isChatOpen
              ? (
                <div >
                  {haveNewMessages && (
                    <div className="bg-red-500 rounded-full p-[5px] absolute top-4"></div>
                  )}
                  <BiMessageDetail className={iconsStyle} />
                </div>
                )
              : (

                  <BiMessageX className={iconsStyle} />

                )}
          </button>{!isChatOpen ? (<span className='tooltiptext'>Abrir chat</span>) : (<span className='tooltiptext'>Cerrar chat</span>)}
          </div>
        </div>
        <div className="action-buttons">
          <div className='tooltip'>
          <button
            className="bg-red-500"
            type="button"
            onClick={() => room?.disconnect()}
          >
           <BiPhoneOff className={iconsStyle} />
            </button><span className='tooltiptext'>Colgar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
