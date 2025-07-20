import "./VideoPlayer.css"
import video from "../../assets/college-video.mp4"
import { useRef } from "react"

function VideoPlayer({playVideo, setPlayVideo}) {
    const vidRef = useRef(null);
    function closePlayer(e) {
        if (e.target === vidRef.current) {
            setPlayVideo(false);
        }
    }

    return(
        <div className={`video-player ${playVideo ? "" : "hide"}`} onClick={closePlayer} ref={vidRef}>
            <video src={video} autoPlay muted controls></video>
        </div>
    )
}

export default VideoPlayer