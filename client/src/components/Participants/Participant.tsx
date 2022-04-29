import { useEffect, useState } from "react"
import { Participant as P } from "twilio-video"
import { usePublication } from "../../hooks/usePublication"
import { PublicationType } from "../../types"
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
  // const aPub = publication.find((p) => p.kind === "audio")

  const vTrack = useTrack(vPub)
  // const aTrack = useTrack(aPub)

  // console.log({
  //   publication,
  //   identity: participant.identity,
  //   isLocalParticipant,
  // })

  return (
    <div className="border-slate-100 p-4">
      <ParticipantTrack track={vTrack} />
      <h2 className="mx-auto text-center py-4">
        {participant.identity}
        {isLocalParticipant && " (you)"}
      </h2>
    </div>
  )
}
