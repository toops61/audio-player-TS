import { RefObject } from "react";
import { paramsType } from "../redux/generalParamsSlice";
import { songType } from "./interfaces";

export const formatTime = (time:number) => {
    const seconds = Math.floor(time%60);
    let secondsString = seconds.toString();
    seconds < 10 && (secondsString = '0' + seconds);
    const formatted = Math.floor(time / 60) + ':' + secondsString;
    return formatted;
};

export const getRandom = (max:number,generalParams:paramsType) => {
    if (max > 1) {
        let security = 0;
        let newId = generalParams.songPlaying!;

        const random = (maxNumber:number) => Math.floor(Math.random() * maxNumber) + 1;

        if (!generalParams.playing && !generalParams.playedArray!.includes(newId)) {
            return random(max);
        }
        while (generalParams.playedArray!.includes(newId)) {
            security++;
            newId = random(max);
            if (security === 500) break;
        }
        return newId;
    } else {
        return 1;
    }
}

export const activeButtonFunc = (div:RefObject<HTMLButtonElement>) => {
    div.current!.classList.add('active');
    setTimeout(() => {
        div.current!.classList.remove('active');
    }, 200);
}

export const sortFunction = (array:songType[],sortBy:string) => {
    const tempArray = [...array];
    tempArray.sort((a,b) => {
        if (a.artist < b.artist) {
            return -1;
        } else if (a.artist === b.artist) {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                } else if (a[sortBy] === b[sortBy]) {
                    return a.track < b.track ? -1 : 1;
                } else {
                    return 1;
                }
        } else {
            return 1;
        }
    });
    const indexedArray = tempArray.map((song,index) => ({...song,index:index+1}));
    return indexedArray;
}