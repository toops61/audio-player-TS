import jsmediatags from "jsmediatags";

export const getTags = () => {
    const targetUrl = audioRef.current.src;
    const tempArray = [...songsArray];
    return jsmediatags.read(targetUrl, {
      onSuccess: tag => {
        const songTags = tag.tags;
        const tempSongObject = {
          ...songSelected,
          artist:songTags.artist,
          album:songTags.album,
          song:songTags.title,
          pictureURL:songTags.picture ? getCover(songTags) : ''
        }
        setSongSelected({...tempSongObject});
        tempArray.splice(tempSongObject.id-1,1,tempSongObject);
        setSongsArray([...tempArray])
      },
      onError: error => console.log(error)
    })
}