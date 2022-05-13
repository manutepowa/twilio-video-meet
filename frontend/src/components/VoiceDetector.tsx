import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MeetContext from '../context/MeetContext'
import clsx from 'clsx'
export const VoiceDetector = () => {
  const { audioSetting } = useContext(MeetContext)
  const spring = {
    type: 'spring',
    damping: 10,
    stiffness: 100
  }
  const [volume, setVolume] = useState(0)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        const microphone = audioContext.createMediaStreamSource(stream)
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)
        analyser.smoothingTimeConstant = 0.8
        analyser.fftSize = 1024
        microphone.connect(analyser)
        analyser.connect(javascriptNode)
        javascriptNode.connect(audioContext.destination)
        javascriptNode.onaudioprocess = function () {
          const array = new Uint8Array(analyser.frequencyBinCount)
          analyser.getByteFrequencyData(array)
          let values = 0
          const length = array.length
          for (let i = 0; i < length; i++) {
            values += array[i]
          }
          const average = values / length
          setVolume(Math.round(average))
        }
      })
  }, [])
  return (

      <div className="flex flex-col w-full bg-gray-200 rounded-full h-1.5">

      <motion.div
        transition={spring}
        className={clsx('h-1.5 rounded-full max-w-full', audioSetting ? 'bg-green-500' : 'bg-gray-500')}
        style={{ width: audioSetting ? volume + '%' : '100%' }}
      ></motion.div>

      </div>

  )
}
