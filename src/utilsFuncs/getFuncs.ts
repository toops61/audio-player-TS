import { songType } from "./interfaces";

export const getSongUrl = async (url:string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("La réponse n'est pas OK");
    }
    const monBlob = await response.blob();
    const dynamicUrl = URL.createObjectURL(monBlob);
    return dynamicUrl;
}

const getCover = (data:number[],format:string) => {
    let base64String = "";
    data.map(e => base64String += String.fromCharCode(e));
    const imageUrl = `data:${format};base64,${window.btoa(base64String)}`;
    return imageUrl;
}
export const getMetadata = async (song:songType) => {
    const jsmediatags = window.jsmediatags;
    try {
        const response = await fetch(song.url);
        if (!response.ok) {
          throw new Error("La réponse n'est pas OK");
        }
        const monBlob = await response.blob();
        jsmediatags.read(monBlob, {
            onSuccess: function(tag) {
                const songTags = tag.tags;
                if (songTags) {
                    song.album = songTags.album ?? '';
                    song.artist = songTags.artist ?? '';
                    song.song = songTags.title ?? '';
                    song.pictureURL = (songTags.picture?.data && songTags.picture?.format) ? getCover(songTags.picture.data,songTags.picture.format) : '';
                    console.log(songTags.picture);
                }
            },
            onError: function(error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
        
    }
    return song;
}