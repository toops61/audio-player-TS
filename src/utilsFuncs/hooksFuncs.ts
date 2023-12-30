import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { songsUrlType } from "./interfaces";

export const useSongsHandle = () => {
    
    const [songsArray, setSongsArray] = useState<songsUrlType[]>([]);

    const getSongs = () => {
        //const songs = importAll('./assets/songs');
        const songsObj = import.meta.glob('../assets/songs/*.{mp3,m4a,wav,aiff}');
        const songsArray = Object.keys(songsObj);
        const songs = songsArray.map(name => ({
            id:nanoid(),
            url:name
        }))
        setSongsArray(songs);
    }
    
    useEffect(() => {
        getSongs();
    }, [])

    return {songsArray};
}