import { useContext, useState } from 'react'
import MeetContext from '../../context/MeetContext'
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
  BiWrench
} from 'react-icons/bi'
import { SettingsPopup } from '../SettingsPopup'

const iconsStyle = 'text-white text-2xl'

export const RoomSettings = () => {
  const { audioSetting, setAudioSetting, videoSetting, setVideoSetting } = useContext(MeetContext)
  const [popUp, setPopUp] = useState(false)
  const toggleAudio = () => {
    setAudioSetting?.(!audioSetting)
  }

  const toggleVideo = () => {
    setVideoSetting?.(!videoSetting)
  }

  return (
    <div className="">
      <div className="flex gap-1 bg-black rounded-md">
        <div className="m-0 action-buttons">
          <div className='p-0 m-0 tooltip'>
            <button type="button" onClick={toggleAudio}>
              {audioSetting
                ? (
                <BiMicrophone className={iconsStyle} />

                  )
                : (
                    <BiMicrophoneOff className={iconsStyle} />

                  )}
              </button>{audioSetting ? (<span className='tooltiptext'>Silenciar</span>) : (<span className='tooltiptext'>Activar</span>)}
          </div>

        </div>
        <div className="m-0 action-buttons">
          <div className='p-0 m-0 tooltip'>
          <button type="button" onClick={toggleVideo}>
            {videoSetting
              ? (

                  <BiVideo className={iconsStyle} />

                )
              : (

                  <BiVideoOff className={iconsStyle} />

                )}
          </button>{videoSetting ? (<span className='tooltiptext'>Apagar</span>) : (<span className='tooltiptext'>Encender</span>)}
          </div>
        </div>
        <div className="m-0 action-buttons">
          <div className='p-0 m-0 tooltip'>
          <button type="button" onClick={() => setPopUp(!popUp)}>
            <BiWrench className={iconsStyle} />
          </button><span className='tooltiptext'>Ajustes</span>
          </div>
        </div>
      </div>
        {popUp && (
          <SettingsPopup />
        )}
    </div>
  )
}
