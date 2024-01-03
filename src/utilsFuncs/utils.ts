import { paramsType } from "../redux/generalParamsSlice";

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