import { updateGeneralParams } from "../redux/generalParamsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function VolumeControl() {
    const volume = useAppSelector(state => state.generalParamsSlice.volume);

    const dispatch = useAppDispatch();

    const handleVolume = (moreLess:string) => {
        let newVolume = volume;
        if (moreLess === 'more') {
            volume < 1 && (newVolume = Math.ceil((volume*10)+1)/10);
        } else {
            volume > 0 && (newVolume = Math.ceil(volume*10-1)/10);
        }
        dispatch(updateGeneralParams({volume:newVolume}));
    }

  return (
    <div className="volume-buttons">
        <button className="volume" onClick={() => handleVolume('more')}></button>
        <button className="volume" onClick={() => handleVolume('less')}></button>
    </div>
  )
}