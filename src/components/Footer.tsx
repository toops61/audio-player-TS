import { updateGeneralParams } from "../redux/generalParamsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Footer() {
    const sortBy = useAppSelector(state => state.generalParamsSlice.sortBy);
    const songsArray = useAppSelector(state => state.songsSlice);
    const songPlaying = useAppSelector(state => state.generalParamsSlice.songPlaying);

    const dispatch = useAppDispatch();

    const handleSort = () => {
        dispatch(updateGeneralParams({sortBy:sortBy === 'album' ? 'year' : 'album'}));
    }
  return (
    <div className="player-footer">
        <div className="sort-div">
            <p>Sort by</p>
            <p><span onClick={handleSort}>{sortBy === 'album' ? 'album' : 'year'}</span></p>
        </div>
        <div className="title-number">
            <p>{`${songsArray[songPlaying-1].index}/${songsArray.length}`}</p>
        </div>
    </div>
  )
}