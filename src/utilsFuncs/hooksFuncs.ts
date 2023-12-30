import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { songType, songsUrlType } from "./interfaces";

export const useSongsHandle = () => {
    
    const [songsArray, setSongsArray] = useState<songsUrlType[]>([]);
    const [songSelected, setSongSelected] = useState<songType|null>(null);

    const getSongs = () => {
        const songsObj = import.meta.glob('../../public/songs/*.{mp3,m4a,wav,aiff}');
        const songsArray = Object.keys(songsObj);
        const songs = songsArray.map(name => {
            console.log(name);
            
            const songName = name ? name.split('../../public')[1] : '';
            const url = '.' + songName;
            return {
                id:nanoid(),
                url
            }
        })
        setSongsArray(songs);
        songs.length && setSongSelected({
            ...songs[0],
            artist:'',
            index:1,
            song:'',
            album:'',
            pictureURL:''
        })
    }
    
    useEffect(() => {
        getSongs();
    }, [])

    return {songsArray,songSelected};
}