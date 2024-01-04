import { useRef } from "react";
import { useSongsHandle } from "./utilsFuncs/hooksFuncs";
import ScreenDisplay from "./components/ScreenDisplay";
import Controls from "./components/Controls";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateTime } from "./redux/timeSlice";
import Loader from "./components/Loader";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const generalParams = useAppSelector(state => state.generalParamsSlice);

  const dispatch = useAppDispatch();

  const getDuration = () => {
    if (audioRef?.current) {
      const duration = audioRef.current.duration;
      dispatch(updateTime({duration}));
    }
  };
  
  const { songsArray } = useSongsHandle();

  return (
    <main className="App">
      {generalParams.isLoading ? <Loader /> :
      <div className="player-body">
          <audio src={songsArray.length ? songsArray[generalParams.songPlaying-1]?.url : ''} className="song" ref={audioRef} onDurationChange={getDuration}></audio>
          
          <div className="player-back">
            <div className="triangle-corner"></div>
          </div>
          <div className="player-front"></div>
          {
            songsArray.length ? <>
              <ScreenDisplay audioRef={audioRef} />
              <Controls audioRef={audioRef} />
            </> : <></>
          }
        </div>}
    </main>
  )
}

export default App
