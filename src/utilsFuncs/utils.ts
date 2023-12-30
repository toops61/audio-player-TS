export const formatTime = (time:number) => {
    const seconds = Math.round(time%60);
    let secondsString = seconds.toString();
    seconds < 10 && (secondsString = '0' + seconds);
    const formatted = Math.floor(time / 60) + ':' + secondsString;
    return formatted;
};