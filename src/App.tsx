import { useRef } from "react";
import { useSongsHandle } from "./utilsFuncs/hooksFuncs";
import ScreenDisplay from "./components/ScreenDisplay";
import Controls from "./components/Controls";
import { useAppDispatch } from "./redux/hooks";
import { updateGeneralParams } from "./redux/generalParamsSlice";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { songSelected } = useSongsHandle();

  const dispatch = useAppDispatch();

  const getDuration = () => {
    if (audioRef?.current) {
      const duration = audioRef.current.duration;
      dispatch(updateGeneralParams({duration}));
      audioRef.current.volume = .1;
    }
  };  

  return (
    <main className="App">
      {songSelected ? <div className="player-body">
          <audio src={songSelected.url} className="song" ref={audioRef} onDurationChange={getDuration}></audio>
          
          <div className="player-back">
            <div className="triangle-corner"></div>
          </div>
          <div className="player-front"></div>
          {/* 
          <div className="volume-buttons">
            <button className="volume" onClick={e => volume < 1 && setVolume(Math.ceil((volume*10)+1)/10)}></button>
            <button className="volume" onClick={e => volume > 0 && setVolume(Math.ceil(volume*10-1)/10)}></button>
          </div>
          {songSelected.url ? <audio src={songSelected.url} className="song" ref={audioRef} onDurationChange={getDuration}></audio> : <></>}
          <section className="screen-container">
            {songSelected.pictureURL ? <img src={songSelected.pictureURL} alt="cover" /> : <div className="no-picture"></div>}
          </section>
          
          <section className="progressbar-container">
            <div className="progress-bar" onClick={jumpCurrent}>
              <div className="progress" style={{transform:`translateX(${audioRef.current ? displayTimeBar() : 0}%)`}}></div>
            </div>
            <div className="time">
              <p>{formatTime(timerAudio)}</p>
              <p>{formatTime(duration)}</p>
            </div>
          </section>
          <section className="controls-container">
            <div className={random ? "random active" : "random"} onClick={e => setRandom(!random)}></div>
            <button className="backward" onClick={handlePrevious}></button>
            <button className={play ? "play-pause active" : "play-pause"} onClick={handlePlay}>
              <div className="play"></div>
              <div className="pause"></div>
            </button>
            <button className="forward" onClick={handleNext}></button>
            <div className={repeat ? "repeat selected" : "repeat"} onClick={handleRepeat}>
              {repeat === 'one' ? <p>1</p> : <></>}
            </div>
          </section> */}
          <ScreenDisplay audioRef={audioRef} />
          <Controls audioRef={audioRef} />
        </div> : <></>}
    </main>
  )
}

export default App
