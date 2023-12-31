import { useRef, useState } from "react";
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

  const jumpCurrent = e => {
    const clickPosition = e.nativeEvent.layerX;
    const barLength = document.querySelector('.progress-bar').offsetWidth;
    const x = Math.round((clickPosition * generalParams.duration) / barLength);
    /* audioRef?.current?.currentTime = x;
    setTimerAudio(x); */
  }

  return (
    <section className="progressbar-container">
        <div className="progress-bar" onClick={jumpCurrent}>
        <div className="progress" style={{transform:`translateX(${audioRef?.current ? displayTimeBar() : 0}%)`}}></div>
        </div>
        <div className="time">
        <p>{formatTime(timerAudio)}</p>
        <p>{formatTime(generalParams.duration)}</p>
        </div>
    </section>
  )
}