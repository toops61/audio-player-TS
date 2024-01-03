import { useAppSelector } from "../redux/hooks";
import { useSongsHandle } from "../utilsFuncs/hooksFuncs";
import ProgressBar from "./ProgressBar";

export default function ScreenDisplay({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
  const { songsArray } = useSongsHandle();

  const songPlaying = useAppSelector(state => state.generalParamsSlice.songPlaying);

  return (
      songsArray.length ? 
      <>
        <section className="screen-container">
          {songsArray[songPlaying-1].pictureURL ? <img src={songsArray[songPlaying-1].pictureURL} alt="cover" /> : <div className="no-picture"></div>}
        </section>
        <section className="title-container">
          <div className="title">
            <h1>{songsArray[songPlaying-1].artist}</h1>
            <p>{songsArray[songPlaying-1].song}</p>
            <p>{songsArray[songPlaying-1].album}</p>
          </div>
          <div className="title-number"><p>{`${songsArray[songPlaying-1].index}/${songsArray.length}`}</p></div>
        </section>
        <ProgressBar audioRef={audioRef} />
      </>
    : <>
    <h1>No song found...</h1>
    </>
  )
}