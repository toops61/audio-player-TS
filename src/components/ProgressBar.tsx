import { MouseEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { formatTime } from "../utilsFuncs/utils";

export default function ProgressBar({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
    const [timerAudio, setTimerAudio] = useState(0);

    const progressRef = useRef<HTMLDivElement>(null);

    const timeObject = useAppSelector(state => state.timeSlice);

    //display progress bar
  const displayTimeBar = (time:number) => (-100 + (time*100)/timeObject.duration);

  const jumpCurrent = (e:MouseEvent<HTMLDivElement>) => {
      if (progressRef.current) {
        const containerPosition = Math.round(progressRef.current.getBoundingClientRect().x);
        const clickPosition = e.pageX - containerPosition;
        const barLength = progressRef.current.offsetWidth;
        const x = Math.round((clickPosition * timeObject.duration) / barLength);
        audioRef?.current && (audioRef.current.currentTime = x);
    }
  }

  const handleSongTime = () => {
        const audioDiv = audioRef!.current;
        const currentTime = audioDiv!.currentTime;
        const currentTimeRound = (Math.round(currentTime*10))/10;
        setTimerAudio(currentTimeRound);
  }

  useEffect(() => {
    const audioDiv = audioRef?.current;
    if (audioDiv) {
      audioDiv.addEventListener("timeupdate", handleSongTime);
    }
    return () => {
      audioDiv && audioDiv.removeEventListener("timeupdate", handleSongTime);
    }
  }, [audioRef])

  return (
    <section className="progressbar-container">
        <div className="progress-bar" onClick={jumpCurrent} ref={progressRef} >
        <div className="progress" style={{transform:`translateX(${displayTimeBar(timerAudio)}%)`}}></div>
        </div>
        <div className="time">
        <p>{formatTime(timerAudio)}</p>
        <p>{formatTime(timeObject.duration)}</p>
        </div>
    </section>
  )
}