import { useEffect, useState } from "react";
import { songType } from "./interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { nanoid } from "nanoid";
import { buildSongsArray } from "../redux/songsSlice";
import { TagType } from "jsmediatags/types";
import { getMetadata } from "./getFuncs";
import { sortFunction } from "./utils";
import { updateGeneralParams } from "../redux/generalParamsSlice";

export const useSongsHandle = () => {
    const [songsArray, setSongsArray] = useState<songType[]>([]);

    const sortBy = useAppSelector(state => state.generalParamsSlice.sortBy);

    const dispatch = useAppDispatch();

    //get tags from songs list in songs folder
    const getSongs = async (songsArrayTemp:string[]) => {
        const tempArray : songType[] = [];
        const songs = await Promise.all(songsArrayTemp.map(async (songUrl,index) => {
            
            const url = songUrl.replace('../../public/','./');
            const songObj = {
                artist:'unknown',
                id: nanoid(),
                index:index+1,
                song:'unknown',
                album:'unknown',
                track:1,
                url,
                year:2000
            }
            const tempObj = {...songObj};

            //callback tags function called inside getMetada
            const metaFunc = (tag:TagType) => {
                const songTags = tag.tags;
                //console.log(songTags);
                try {
                    
                    if (songTags) {
                        let track = 1;
                        if (songTags.track && typeof songTags.track === 'number') {
                            track = songTags.track;
                        } else if (songTags.track && typeof songTags.track === 'string' && songTags.track.includes('/')) {
                            track = parseInt(songTags.track.split('/')[0],10);
                        }
    
                        tempObj.album = songTags.album ?? '';
                        tempObj.artist = songTags.artist ?? '';
                        tempObj.song = songTags.title ?? '';
                        tempObj.track = track;
                        tempObj.year = songTags.year ? parseInt(songTags.year,10) : 2000;
                        tempArray.push(tempObj);
                        if (tempArray.length === songsArrayTemp.length) {
                            const sortedArray = sortFunction(tempArray,sortBy);
                            setSongsArray(sortedArray);
                        }

                        /* if (songTags.album && songTags.picture && !coversTempArray.some(e => e.album === songTags.album)) {
                            const pictureURL = {
                                album:songTags.album,
                                cover:songTags.picture ? getCover(songTags.picture) : ''
                            }
                            try {
                                coversTempArray.push(pictureURL);
                            } catch (error) {
                                console.log('can t add cover...',songTags.album,JSON.stringify(coversTempArray).length,error);
                            }
                        } */
                    }
                } catch (error) {
                    console.log('error on getting tags',error);
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
        dispatch(updateGeneralParams({isLoading:false}));
        return songs;
    }

    useEffect(() => {
        const songsObj = import.meta.glob('../../public/songs/*.{mp3,m4a,wav,aiff}');
        const songsArrayTemp = Object.keys(songsObj);
        if (songsArrayTemp.length) {
            getSongs(songsArrayTemp)
        } else {
            alert('no songs');
            dispatch(updateGeneralParams({isLoading:false}));
        }
    },[])
      
    useEffect(() => {
        if (songsArray.length) {
            const sortedArray = sortFunction(songsArray,sortBy);
            setSongsArray(sortedArray);
        }
    }, [sortBy])
    

    useEffect(() => {
        if (songsArray.length) {
            dispatch(buildSongsArray(songsArray));
        }
    }, [songsArray])
    
    return { songsArray };
}