import { useEffect, useState } from "react"
import { LocalAudioTrack, LocalTrack, LocalTrackPublication, LocalVideoTrack, Participant as P, RemoteAudioTrack, RemoteTrack, RemoteTrackPublication, RemoteVideoTrack } from "twilio-video"
import { useDominantSpeaker } from "../../hooks/useDominantSpeaker"
import { usePublication } from "../../hooks/usePublication"
import { useSpeakerAudio } from "../../hooks/useSpeakerAudio"
import { PublicationType } from "../../types"
import { ParticipantAudioTrack } from "./ParticipantAudioTrack"
import { ParticipantTrack } from "./ParticipantTrack"

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
  const dominantSpeaker = useDominantSpeaker()

  const vPub = publication.find((p) => p.kind === "video")
  const aPub = publication.find((p) => p.kind === "audio")
  
  const vTrack = useTrack(vPub)
  const aTrack = useTrack(aPub) as LocalAudioTrack | RemoteAudioTrack | undefined 
  
  const isAudioEnabled = useSpeakerAudio(aTrack) 

  return (
    <div className="border-slate-100">
      <ParticipantTrack track={vTrack} dominant={dominantSpeaker !== null} />
      <ParticipantAudioTrack track={aTrack} />
      <p className="text-center p-2 bg-sky-500 uppercase text-sm font-bold">
        {participant.identity}
        {isLocalParticipant && " (you)"}
        {dominantSpeaker?.identity === participant.identity && " (dominant)"}
        {isAudioEnabled ? " (audio enable)" : "(audio disable)"}
      </p>
    </div>
  )
}
