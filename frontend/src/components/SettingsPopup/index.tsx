import { useState, useEffect, useContext } from 'react'
import { createLocalAudioTrack, CreateLocalTrackOptions, createLocalVideoTrack } from 'twilio-video'
import MeetContext from '../../context/MeetContext'

export const SettingsPopup = () => {
  const { setAudioDevice, setVideoDevice } = useContext(MeetContext)
  const [audioInput, setAudioInput] = useState<MediaDeviceInfo[]>()
  const [videoInput, setVideoInput] = useState<MediaDeviceInfo[]>()

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      if (devices.length > 0) {
        const videoDevices: MediaDeviceInfo[] = devices.filter((device) => device.kind === 'videoinput')
        setVideoInput(videoDevices)
        const audioDevices: MediaDeviceInfo[] = devices.filter((device) => device.kind === 'audioinput')
        setAudioInput(audioDevices)
      }
    })
  }, [])

  const changeAudio = (e: any) => {
    const deviceId = e.target.value
    // createLocalAudioTrack({ deviceId: audioDevice }).then((track) => {
    //   setAudioDevice?.(track)
    // })
    const options: CreateLocalTrackOptions = {}

    if (deviceId) {
      options.deviceId = { exact: deviceId }
    }

    return createLocalAudioTrack(options).then(newTrack => {
      setAudioDevice?.(newTrack)
      return newTrack
    })
  }
  const changeVideo = (e: any) => {
    const deviceId = e.target.value
    // createLocalVideoTrack({ deviceId: videoDevice }).then((track) => {
    //   setVideoDevice?.(track)
    // })
    const options: CreateLocalTrackOptions = {}

    if (deviceId) {
      options.deviceId = { exact: deviceId }
    }

    return createLocalVideoTrack(options).then(newTrack => {
      setVideoDevice?.(newTrack)
      return newTrack
    })
  }

  return (
  <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-black rounded-xl'>
    <p>Ajustes de entrada [WIP]</p>
    {
      audioInput && !!audioInput.length && (
        <div>
          <h3 className='text-white text-xl'>Audio</h3>
          <select className="text-black" onChange={changeAudio}>
            {audioInput?.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))}
          </select>
        </div>
      )
    }
    {videoInput && !!videoInput.length && (
      <div>
        <h3 className='text-white text-xl'>Video</h3>
        <select className='text-black' onChange={changeVideo}>
          {videoInput?.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
          ))}
        </select>
      </div>)}
  </div>)
}
