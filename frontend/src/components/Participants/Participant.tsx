import { useEffect, useState } from "react"
import { Participant as P } from "twilio-video"
import { usePublication } from "../../hooks/usePublication"
import { PublicationType } from "../../types"
import { ParticipantAudioTrack } from "./ParticipantAudioTrack"
import { ParticipantTrack } from "./ParticipantTrack"

type Props = {
  participant: P,
  isLocalParticipant: boolean,
}

const useTrack = (publication: PublicationType | undefined) => {
  const [track, setTrack] = useState(publication?.track)

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

  const vPub = publication.find((p) => p.kind === "video")
  const aPub = publication.find((p) => p.kind === "audio")

  const vTrack = useTrack(vPub)
  const aTrack = useTrack(aPub)

  return (
    <div className="border-slate-100">
      <ParticipantTrack track={vTrack} />
      <ParticipantAudioTrack track={aTrack} />
      <p className="text-center p-2 bg-sky-500 uppercase text-sm font-bold">
        {participant.identity}
        {isLocalParticipant && " (you)"}
      </p>
    </div>
  )
}
