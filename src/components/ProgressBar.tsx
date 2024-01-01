import { MouseEvent, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { formatTime } from "../utilsFuncs/utils";

export default function ProgressBar({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
    const [timerAudio, setTimerAudio] = useState(0);

    const progressRef = useRef<HTMLDivElement>(null);

    const generalParams = useAppSelector(state => state.generalParamsSlice);

    //display progress bar
  const displayTimeBar = () => {
    const current = audioRef?.current?.currentTime || 0;
    const progress = -100 + (current*100)/generalParams.duration;
    return progress;
  }

  const jumpCurrent = (e:MouseEvent<HTMLDivElement>) => {
      if (progressRef.current) {
        const containerPosition = Math.round(progressRef.current.getBoundingClientRect().x);
        const clickPosition = e.pageX - containerPosition;
        const barLength = progressRef.current.offsetWidth;        
        const x = Math.round((clickPosition * generalParams.duration) / barLength);
        audioRef?.current && (audioRef.current.currentTime = x);
        setTimerAudio(x);
    }
  }

  return (
    <section className="progressbar-container">
        <div className="progress-bar" onClick={jumpCurrent} ref={progressRef} >
        <div className="progress" style={{transform:`translateX(${audioRef?.current ? displayTimeBar() : 0}%)`}}></div>
        </div>
        <div className="time">
        <p>{formatTime(timerAudio)}</p>
        <p>{formatTime(generalParams.duration)}</p>
        </div>
    </section>
  )
}