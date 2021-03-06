import { useEffect, useState } from 'react'
import { LocalAudioTrack, LocalTrack, LocalTrackPublication, LocalVideoTrack, Participant as P, RemoteAudioTrack, RemoteTrack, RemoteTrackPublication, RemoteVideoTrack } from 'twilio-video'
import { useDominantSpeaker } from '../../hooks/useDominantSpeaker'
import { usePublication } from '../../hooks/usePublication'
import { useIsTrackEnabled } from '../../hooks/useIsTrackEnabled'
import { ParticipantAudioTrack } from './ParticipantAudioTrack'
import { ParticipantTrack } from './ParticipantTrack'
import { BiMicrophoneOff } from 'react-icons/bi'
import { useAvatar } from '../../hooks/useAvatar'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type Props = {
  participant: P,
  isLocalParticipant: boolean,
  grid: number
}

const useTrack = (publication: LocalTrackPublication | RemoteTrackPublication | undefined) => {
  const [track, setTrack] = useState<LocalTrack | RemoteTrack | null | undefined>(publication?.track)

  useEffect(() => {
    setTrack(publication?.track)
    if (publication) {
      const removeTrack = () => setTrack(null)
      publication?.on('subscribed', setTrack)
      publication?.on('unsubscribed', removeTrack)
    }
  }, [publication])

  return track
}

export const Participant = ({ participant, isLocalParticipant, grid }: Props) => {
  const publication = usePublication(participant)
  const { url: avatarURL, fondo } = useAvatar(participant)
  const { identity } = useDominantSpeaker()

  const imDominantSpeaker = identity === participant.identity

  const vPub = publication.find((p) => p.kind === 'video')
  const aPub = publication.find((p) => p.kind === 'audio')

  const vTrack = useTrack(vPub) as LocalVideoTrack | RemoteVideoTrack | undefined
  const aTrack = useTrack(aPub) as LocalAudioTrack | RemoteAudioTrack | undefined

  const isAudioEnabled = useIsTrackEnabled(aTrack)
  const isVideoEnabled = useIsTrackEnabled(vTrack)
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  console.log(fondo)
  return (

    <div className={clsx('border-2 border-slate-400/20 rounded-md ', {

      'h-screen w-full border-0': grid === 1,
      'md:w-1/2': grid === 2,
      'md:w-1/3 w-1/2': grid > 2,
      'md:w-1/4': grid > 6,
      'md:w-1/5  w-1/3': grid > 8,
      'md:w-1/6': grid > 12,
      'md:w-1/7': grid > 16

    })}>
      <motion.div className='relative'
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: 0.8
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }}
      >
      <ParticipantTrack grid={grid} track={vTrack} imDominantSpeaker={imDominantSpeaker} />
      <ParticipantAudioTrack track={aTrack} />
      {!isVideoEnabled && (
        <div className="absolute w-16 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <img className="rounded-md" src={avatarURL} alt="avatar" />
        </div>
      )}
        <div className="absolute px-2 py-1 text-xs rounded-md md:text-sm bg-opacity-80 bottom-2 left-2" style={{ backgroundColor: '#' + fondo }}>
        {participant.identity}
        {isLocalParticipant && ' (me)'}
      </div>

        {!isAudioEnabled && (
          <div className="absolute px-2 py-1 rounded-md bg-[#ca2828] bg-opacity-80 bottom-2 right-2">
            <BiMicrophoneOff className="text-white" />
          </div>
        )}
      </motion.div>
    </div>
  )
}
