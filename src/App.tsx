import { useEffect, useRef, useState } from "react";
import { useSongsHandle } from "./utilsFuncs/hooksFuncs";
import ScreenDisplay from "./components/ScreenDisplay";

function App() {
  const { songsArray,songSelected } = useSongsHandle();
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    songsArray && console.log(songsArray);
  }, [songsArray])
  useEffect(() => {
    songSelected && console.log(songSelected);
  }, [songSelected])
  
  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current?.duration);
      audioRef.current.volume = .1;
      console.log(audioRef);
      
    }
  }, [audioRef.current])

  const getDuration = (e) => {
    console.log(e);
  }

  const handlePlay = e => {
    //if (!timerAudio && !play && songSelected.id === 1 && random) randomSong();
    setPlay(!play);
    if (audioRef.current) {
      console.log(audioRef);
      !play ? audioRef.current.play() : audioRef.current.pause();
      
    }
  }

  return (
    <main className="App">
      <h1>Player</h1>
      <div className="audio-player-page">
      {songSelected ? <div className="player-body">
          <audio src={songSelected.url} className="song" ref={audioRef} onDurationChange={e => getDuration(e)}></audio>
          <button className={play ? "play-pause active" : "play-pause"} onClick={handlePlay}>
            <div className="play"></div>
            <div className="pause"></div>
          </button>
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
          <ScreenDisplay length={songsArray.length} songSelected={songSelected} />
        </div> : <></>}
      </div>
    </main>
  )
}

export default App
