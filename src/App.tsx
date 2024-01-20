import { useRef } from "react";
import { useSongsHandle } from "./utilsFuncs/hooksFuncs";
import ScreenDisplay from "./components/ScreenDisplay";
import Controls from "./components/Controls";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { updateTime } from "./redux/timeSlice";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const generalParams = useAppSelector(state => state.generalParamsSlice);
  const songsSlice = useAppSelector(state => state.songsSlice);

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
          {
            songsSlice.length ? 
            <>
              <audio src={songsArray[generalParams.songPlaying-1]?.url} className="song" ref={audioRef} onDurationChange={getDuration}></audio>
              <div className="player-back">
                <div className="triangle-corner"></div>
              </div>
              <div className="player-front"></div>
              <ScreenDisplay audioRef={audioRef} />
              <Controls audioRef={audioRef} />
              <Footer />
            </> : <></>
          }
        </div>}
    </main>
  )
}

export default App
