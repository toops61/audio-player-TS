import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateGeneralParams } from "../redux/generalParamsSlice";
import VolumeControl from "./VolumeControl";
import { activeButtonFunc, getRandom } from "../utilsFuncs/utils";

export default function Controls({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
    
    const songsArray = useAppSelector(state => state.songsSlice);

    const generalParams = useAppSelector(state => state.generalParamsSlice);

    const dispatch = useAppDispatch();

    const backwardRef = useRef<HTMLButtonElement>(null);
    const forwardRef = useRef<HTMLButtonElement>(null);

    const resetPlaying = () => {
        dispatch(updateGeneralParams({songPlaying:1,playing:false,playedArray:[]}));
        audioRef?.current && audioRef?.current.pause();
    }

    const handlePlay = () => {
        //if (!timerAudio && !play && songSelected.id === 1 && random) randomSong();
        dispatch(updateGeneralParams({playing:!generalParams.playing}));
        if (audioRef?.current) {
          //console.log(audioRef);
          !generalParams.playing ? audioRef.current.play() : audioRef.current.pause();
          if (audioRef.current.currentTime === 0 && !generalParams.playedArray.length && !generalParams.repeat) dispatch(updateGeneralParams({playedArray:[generalParams.songPlaying]}));
        }
    }

    const handleRepeat = () => {
        switch (generalParams.repeat) {
          case '':
            dispatch(updateGeneralParams({repeat:'ALL'}));
            break;
          case 'ALL':
            dispatch(updateGeneralParams({repeat:'ONE'}));
            break;
          case 'ONE':
            dispatch(updateGeneralParams({repeat:''}));
            break;
          default:
            break;
        }
    }

    const handlePrevious = () => {
        if (audioRef?.current && backwardRef?.current && !backwardRef.current.className.includes('active')) {
            const currentSongDiv = audioRef.current;
            if (currentSongDiv.currentTime > 1) {
                currentSongDiv.currentTime = 0;
            } else {
                generalParams.songPlaying > 1 && dispatch(updateGeneralParams({songPlaying:generalParams.songPlaying-1}));
            }
            audioRef.current.volume = generalParams.volume;
            activeButtonFunc(backwardRef);
        }
    }

    const handleNext = () => {
        if (forwardRef?.current && !forwardRef.current.className.includes('active')) {
            const totalSongs = songsArray.length;
            if (generalParams.repeat === 'ONE' && generalParams.playing) {
                audioRef?.current && (audioRef.current.currentTime = 0);
            } else {
                if (generalParams.playedArray.length < totalSongs || generalParams.repeat === 'ALL') {
                    if (!generalParams.random) {
                        if (generalParams.songPlaying < totalSongs) {
                            dispatch(updateGeneralParams({songPlaying:generalParams.songPlaying+1}));
                        } else {
                            generalParams.repeat === 'ALL' && dispatch(updateGeneralParams({songPlaying:1}));
                        }
    
                    } else {
                        const newId = getRandom(totalSongs,generalParams);
                        dispatch(updateGeneralParams({songPlaying:newId}));
                    }
                } else {
                    resetPlaying();
                }
            }
            activeButtonFunc(forwardRef);
        }
    }

    useEffect(() => {
      if (audioRef?.current) {
        audioRef.current.volume = generalParams.volume;
      }
    }, [generalParams.volume])

    useEffect(() => {
        if (audioRef?.current && generalParams.playing) {
            !generalParams.repeat && dispatch(updateGeneralParams({playedArray:[...generalParams.playedArray,generalParams.songPlaying]}));
            audioRef?.current?.play();
          }
    }, [generalParams.songPlaying])

    useEffect(() => {
        generalParams.repeat === 'ALL' && dispatch(updateGeneralParams({playedArray:[]}));
    }, [generalParams.repeat])
    
    useEffect(() => {
        const audioDiv = audioRef?.current;
        if (audioDiv) {
            const duration = audioDiv?.duration;
            if (duration && audioDiv.currentTime >= duration) console.log('fin',audioDiv.currentTime,duration);
        }
    }, [audioRef?.current])

    useEffect(() => {
      generalParams.endSong && handleNext();
    }, [generalParams.endSong])
    
    
  return (
    <>
        <VolumeControl />
        <section className="controls-container">
            <div className={generalParams.random ? "random active" : "random"} onClick={() => dispatch(updateGeneralParams({random:!generalParams.random}))}></div>
            <button className="backward" onClick={handlePrevious} ref={backwardRef} ></button>
            <button className={generalParams.playing ? "play-pause active" : "play-pause"} onClick={handlePlay}>
              <div className="play"></div>
              <div className="pause"></div>
            </button>
            <button className="forward" onClick={handleNext} ref={forwardRef} ></button>
            <div className={generalParams.repeat ? "repeat selected" : "repeat"} onClick={handleRepeat}>
              {generalParams.repeat === 'ONE' ? <p>1</p> : <></>}
            </div>
        </section>
    </>
  )
}