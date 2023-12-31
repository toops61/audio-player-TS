import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateGeneralParams } from "../redux/generalParamsSlice";

export default function Controls({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
    const [play, setPlay] = useState(false);

    const generalParams = useAppSelector(state => state.generalParamsSlice);

    const dispatch = useAppDispatch();

    const handlePlay = () => {
        //if (!timerAudio && !play && songSelected.id === 1 && random) randomSong();
        setPlay(!play);
        if (audioRef?.current) {
          console.log(audioRef);
          !play ? audioRef.current.play() : audioRef.current.pause();
          
        }
    }

    const handleRepeat = () => {
        switch (generalParams.repeat) {
          case '':
            dispatch(updateGeneralParams({repeat:'ALL'}));
            break;
          case 'all':
            dispatch(updateGeneralParams({repeat:'ONE'}));
            break;
          case 'one':
            dispatch(updateGeneralParams({repeat:''}));
            break;
          default:
            break;
        }
    }

    const handlePrevious = () => {
        
    }

    const handleNext = () => {

    }

  return (
    <>
        <section className="controls-container">
            <div className={generalParams.random ? "random active" : "random"} onClick={() => dispatch(updateGeneralParams({random:!generalParams.random}))}></div>
            <button className="backward" onClick={handlePrevious}></button>
            <button className={play ? "play-pause active" : "play-pause"} onClick={handlePlay}>
              <div className="play"></div>
              <div className="pause"></div>
            </button>
            <button className="forward" onClick={handleNext}></button>
            <div className={generalParams.repeat ? "repeat selected" : "repeat"} onClick={handleRepeat}>
              {generalParams.repeat === 'ONE' ? <p>1</p> : <></>}
            </div>
        </section>
    </>
  )
}