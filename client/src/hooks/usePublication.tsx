import { useEffect, useState } from "react"
import { Participant } from "twilio-video"
import { PublicationType } from "../types";

export const usePublication = (participant: Participant) => {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  
  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()) as PublicationType[]);
    const publicationAdded = (publication: PublicationType) =>
      setPublications(prevPublications => [...prevPublications, publication]);
    const publicationRemoved = (publication: PublicationType) =>
      setPublications(prevPublications => prevPublications.filter(p => p !== publication));

    participant.on('trackPublished', publicationAdded);
    participant.on('trackUnpublished', publicationRemoved);
  }, [participant]);

  return publications;
}
