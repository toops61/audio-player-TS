import { songType } from "../utilsFuncs/interfaces";

export default function ScreenDisplay({length,songSelected}:{length:number;songSelected:songType}) {
  return (
    <div>
        <section className="title-container">
        <div className="title">
        <h1>{songSelected.artist}</h1>
        <p>{songSelected.song}</p>
        <p>{songSelected.album}</p>
    </div>
    <div className="title-number"><p>{`${songSelected.index}/${length}`}</p></div>
  </section></div>
  )
}