import { useEffect, useState } from "react";
import { songType } from "./interfaces";
import { useAppDispatch } from "../redux/hooks";
import { nanoid } from "nanoid";
import { buildSongsArray } from "../redux/songsSlice";
import { TagType } from "jsmediatags/types";
import { getCover, getMetadata } from "./getFuncs";

export const useSongsHandle = () => {
    const [songsArray, setSongsArray] = useState<songType[]>([]);

    const dispatch = useAppDispatch();

    //get tags from songs list in songs folder
    const getSongs = async (songsArrayTemp:string[]) => {
        const tempArray : songType[] = [];
        const songs = await Promise.all(songsArrayTemp.map(async (songUrl,index) => {
            
            const url = songUrl.replace('../../public/','./');
            const songObj = {
                artist:'',
                id: nanoid(),
                index:index+1,
                song:'',
                album:'',
                pictureURL:'',
                url
            }
            const tempObj = {...songObj};

            //callback tags function called inside getMetada
            const metaFunc = (tag:TagType) => {
                const songTags = tag.tags;
                if (songTags) {
                    tempObj.album = songTags.album ?? '';
                    tempObj.artist = songTags.artist ?? '';
                    tempObj.song = songTags.title ?? '';
                    tempObj.pictureURL = songTags.picture ? getCover(songTags.picture) : '';
                    tempArray.push(tempObj);
                    if (tempArray.length === songsArrayTemp.length) {
                        const sortedArray = [...tempArray].sort((a,b) => a.index - b.index);
                        setSongsArray(sortedArray);
                    }
                }
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Could not get song url");
                }
                const blob = await response.blob();
                getMetadata(blob,metaFunc);
            } catch (error) {
                console.log('error fetching song :',error);
            }
            return songObj;
        }));
        return songs;
    }

    useEffect(() => {
        const songsObj = import.meta.glob('../../public/songs/*.{mp3,m4a,wav,aiff}');
        const songsArrayTemp = Object.keys(songsObj);
        songsArrayTemp.length ? getSongs(songsArrayTemp) : alert('no songs');
    },[])
      

    useEffect(() => {
        if (songsArray.length) {
            dispatch(buildSongsArray(songsArray));
        } 
    }, [songsArray])
    
    return { songsArray };
}