import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateGeneralParams } from "../redux/generalParamsSlice";
import VolumeControl from "./VolumeControl";
import { useSongsHandle } from "../utilsFuncs/hooksFuncs";
import { getRandom } from "../utilsFuncs/utils";

export default function Controls({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
    
    const { songsArray } = useSongsHandle();

    const generalParams = useAppSelector(state => state.generalParamsSlice);

    const dispatch = useAppDispatch();

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
        if (audioRef?.current) {
            const currentSongDiv = audioRef.current;
            if (currentSongDiv.currentTime > 0.5) {
                currentSongDiv.currentTime = 0;
            } else {
                if (generalParams.songPlaying > 1 && !generalParams.repeat) {
                    dispatch(updateGeneralParams({songPlaying:generalParams.songPlaying-1}));
                }
            }
            audioRef.current.volume = generalParams.volume;
        }
    }

    const handleNext = () => {
        const totalSongs = songsArray.length;
        if (generalParams.repeat === 'ONE') {
            audioRef?.current && (audioRef.current.currentTime = 0);
        } else {
            if (generalParams.playedArray.length < totalSongs || generalParams.repeat === 'ALL') {
                if (!generalParams.random) {
                    generalParams.songPlaying < totalSongs && dispatch(updateGeneralParams({songPlaying:generalParams.songPlaying+1}));
                } else {
                    const newId = getRandom(totalSongs,generalParams);
                    dispatch(updateGeneralParams({songPlaying:newId}));
                }
            } else {
                resetPlaying();
            }
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
    
  return (
    <>
        <VolumeControl />
        <section className="controls-container">
            <div className={generalParams.random ? "random active" : "random"} onClick={() => dispatch(updateGeneralParams({random:!generalParams.random}))}></div>
            <button className="backward" onClick={handlePrevious}></button>
            <button className={generalParams.playing ? "play-pause active" : "play-pause"} onClick={handlePlay}>
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