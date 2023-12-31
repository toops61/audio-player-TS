import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { songType, songsUrlType } from "./interfaces";
import { getMetadata, getSongUrl } from "./getFuncs";

export const useSongsHandle = () => {
    const [songsUrlArray, setSongsUrlArray] = useState<songsUrlType[]>([]);
    const [songsArray, setSongsArray] = useState<songType[]>([]);
    const [songSelected, setSongSelected] = useState<songType|null>(null);

    const getSongs = async () => {
        const songsObj = import.meta.glob('../../public/songs/*.{mp3,m4a,wav,aiff}');
        const songsArrayTemp = Object.keys(songsObj);
        const songs = await Promise.all(songsArrayTemp.map(async name => {
            const url = await getSongUrl(name);
            const newObject = {
                id:nanoid(),
                url
            }
            return newObject;
        }))
        setSongsUrlArray(songs);
    }

    const updateMetadataSongs = async (array:songType[]) => {
        const taggedSong= await Promise.all(array.map(async song => {
            const newObject = await getMetadata({...song});
            return newObject;
        }))
        setSongsArray(taggedSong);
        return taggedSong;
    }
    
    useEffect(() => {
        getSongs();
    }, [])

    useEffect(() => {
      if (songsUrlArray.length) {
        const tempArray : songType[] = songsUrlArray.map((songTemp,index) => {
            const songObj = {
                ...songTemp,
                artist:'',
                index:index+1,
                song:'',
                album:'',
                pictureURL:''
            }
            return songObj;
        })

        updateMetadataSongs(tempArray);
      }
    }, [songsUrlArray])

    useEffect(() => {
        songsArray.length && setSongSelected(songsArray[0]);
    }, [songsArray])
    
    return {songsArray,songSelected};
}