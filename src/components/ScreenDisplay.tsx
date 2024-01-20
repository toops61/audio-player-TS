import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ProgressBar from "./ProgressBar";
import { getCover, getTagCover } from "../utilsFuncs/getFuncs";
import { TagType } from "jsmediatags/types";
import { updateCoversArray } from "../redux/coversSlice";

export default function ScreenDisplay({audioRef}:{audioRef:React.RefObject<HTMLAudioElement>|null}) {
  const [cover, setCover] = useState<string|null>(null);

  const songsArray = useAppSelector(state => state.songsSlice);

  const songPlaying = useAppSelector(state => state.generalParamsSlice.songPlaying);
  const covers = useAppSelector(state => state.coversSlice);

  const dispatch = useAppDispatch();

  const coverTagFunc = (tag:TagType) => {
    const songTags = tag.tags;
    const cover = songTags.picture ? getCover(songTags.picture) : '';
    if (cover) {
      setCover(cover);
      dispatch(updateCoversArray({album:songsArray[songPlaying-1]?.album,cover}));
    }
  }

  useEffect(() => {
    if (songsArray.length && songPlaying) {
      const coverTemp = covers.find(cov => cov.album === songsArray[songPlaying-1]?.album);
      setCover(coverTemp ? coverTemp.cover : null);
      if (!coverTemp) {
        getTagCover(songsArray[songPlaying-1]?.url,coverTagFunc);
      }
    }
  }, [songPlaying,songsArray])

  return (
      songsArray.length ? 
      <>
        <section className="screen-container">
          {cover ? <img src={cover} alt="cover" /> : <div className="no-picture"></div>}
        </section>
        <section className="title-container">
          <div className="title">
            <h1>{songsArray[songPlaying-1].artist}</h1>
            <p className="song-title">{songsArray[songPlaying-1].song}</p>
            <p>{songsArray[songPlaying-1].album}</p>
          </div>
        </section>
        <ProgressBar audioRef={audioRef} />
      </>
    : <>
    <h1>No song found...</h1>
    </>
  )
}