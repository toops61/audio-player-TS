import { useEffect } from "react";
import { useSongsHandle } from "../utilsFuncs/hooksFuncs";
import ProgressBar from "./ProgressBar";

export default function ScreenDisplay({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
  const { songsArray,songSelected } = useSongsHandle();

  useEffect(() => {
    songsArray && console.log(songsArray);
  }, [songsArray])
  useEffect(() => {
    songSelected && console.log(songSelected);
  }, [songSelected])

  return (
      songSelected ? 
      <>
        <section className="screen-container">
          {songSelected.pictureURL ? <img src={songSelected.pictureURL} alt="cover" /> : <div className="no-picture"></div>}
        </section>
        <section className="title-container">
          <div className="title">
            <h1>{songSelected.artist}</h1>
            <p>{songSelected.song}</p>
            <p>{songSelected.album}</p>
          </div>
          <div className="title-number"><p>{`${songSelected.index}/${songsArray.length}`}</p></div>
        </section>
        <ProgressBar audioRef={audioRef} />
      </>
    : <></>
  )
}