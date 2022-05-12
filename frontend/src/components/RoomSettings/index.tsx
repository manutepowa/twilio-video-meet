import { useContext } from 'react'
import MeetContext from '../../context/MeetContext'
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff
} from 'react-icons/bi'

const iconsStyle = 'text-white text-2xl'

export const RoomSettings = () => {
  const { audioSetting, setAudioSetting, videoSetting, setVideoSetting } = useContext(MeetContext)

  const toggleAudio = () => {
    setAudioSetting?.(!audioSetting)
  }

  const toggleVideo = () => {
    setVideoSetting?.(!videoSetting)
  }

  return (
    <div className="">
      <div className="flex gap-1 bg-black rounded-md">
        <div className="action-buttons">
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
        <div className="action-buttons">
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
      </div>
    </div>
  )
}
