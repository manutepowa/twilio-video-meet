import { useContext } from "react"
import MeetContext from "../../context/MeetContext"
import { BiMicrophone, BiMicrophoneOff, BiPhoneOff, BiVolumeFull, BiVolumeMute, BiVideo, BiVideoOff } from "react-icons/bi";
import { useToggleActions } from "../../hooks/useToggleActions";

export const RoomActions = () => {
  const { room, localParticipant } = useContext(MeetContext)
  const { localAudio, localVideo } = useToggleActions(localParticipant)

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex bg-black p-1 gap-2 rounded-md">
        <div className="action-buttons">
          <button type="button" onClick={() => localAudio.muteAudio()}>
            {localAudio.isMuted ? <BiMicrophoneOff className="text-white text-2xl" /> : <BiMicrophone className="text-white text-2xl" />}
          </button>
        </div>
        <div className="action-buttons">
          <button type="button" onClick={() => localVideo.disableVideo()}>
            {localVideo.isVideoEnabled ? <BiVideoOff className="text-white text-2xl" /> : <BiVideo className="text-white text-2xl" />}
          </button>
        </div>
        <div className="action-buttons">
          <button type="button" onClick={() => room?.disconnect()}>
            <BiVolumeFull className="text-white text-2xl" />
          </button>
        </div>
        <div className="action-buttons">
          <button className="bg-red-500" type="button" onClick={() => room?.disconnect()}>
            <BiPhoneOff className="text-white text-2xl" />
          </button>
        </div>
      </div>
    </div>
  )
}
