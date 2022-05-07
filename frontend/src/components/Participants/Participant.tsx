import { useEffect, useState } from "react"
import { LocalAudioTrack, LocalTrack, LocalTrackPublication, LocalVideoTrack, Participant as P, RemoteAudioTrack, RemoteTrack, RemoteTrackPublication, RemoteVideoTrack } from "twilio-video"
import { useDominantSpeaker } from "../../hooks/useDominantSpeaker"
import { usePublication } from "../../hooks/usePublication"
import { useIsTrackEnabled } from "../../hooks/useIsTrackEnabled"
import { ParticipantAudioTrack } from "./ParticipantAudioTrack"
import { ParticipantTrack } from "./ParticipantTrack"
import { BiMicrophoneOff } from "react-icons/bi";
import { useAvatar } from "../../hooks/useAvatar"

type Props = {
  participant: P,
  isLocalParticipant: boolean,
}

const useTrack = (publication: LocalTrackPublication | RemoteTrackPublication | undefined) => {
  const [track, setTrack] = useState<LocalTrack | RemoteTrack | null | undefined>(publication?.track)

  useEffect(() => {
    setTrack(publication?.track)
    if (publication) {
      const removeTrack = () => setTrack(null)
      publication?.on("subscribed", setTrack)
      publication?.on("unsubscribed", removeTrack)
    }
  }, [publication])
  
  return track
}

export const Participant = ({ participant, isLocalParticipant }: Props) => {
  const publication = usePublication(participant)
  const {url: avatarURL} = useAvatar(participant)
  const { identity } = useDominantSpeaker()

  const imDominantSpeaker = identity === participant.identity

  const vPub = publication.find((p) => p.kind === "video")
  const aPub = publication.find((p) => p.kind === "audio")
  
  const vTrack = useTrack(vPub) as LocalVideoTrack | RemoteVideoTrack | undefined
  const aTrack = useTrack(aPub) as LocalAudioTrack | RemoteAudioTrack | undefined 
  
  const isAudioEnabled = useIsTrackEnabled(aTrack) 
  const isVideoEnabled = useIsTrackEnabled(vTrack) 

  return (
    <div className="relative">
      <ParticipantTrack track={vTrack} imDominantSpeaker={imDominantSpeaker} />
      <ParticipantAudioTrack track={aTrack} />
      {!isVideoEnabled && (
        <div className="absolute w-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="rounded-md" src={avatarURL} alt="avatar" />
        </div>
      )}
      <div className="absolute bg-primary bg-opacity-80 text-sm px-1 rounded-md bottom-1 left-1">
        {participant.identity}
        {isLocalParticipant && " (me)"}
      </div>
      {!isAudioEnabled && (
        <div className="absolute bg-primary bg-opacity-80 p-1 rounded-md bottom-1 right-1">
          <BiMicrophoneOff className="text-white" />
        </div>
      )}
    </div>
  )
}
