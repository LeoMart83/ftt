import { useState } from 'react';
import PricesChart from './PricesChart';
import { TickersSlice } from '../store/reducers/TickersSlice';
import hideIcon from "../assets/hide.png";
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';

const TickerRow = ({ ticker }) => {

    const { shortName, fullName, price, change, change_percent } = ticker;
    const { hideTicker } = TickersSlice.actions;
    const [showChart, setShowChart] = useState(false);
    const [isShown, setIsShown] = useState(true);
    const dispatch = useAppDispatch();
    const chartData = useAppSelector((state) => state.tickersReducer.chartData.find(chart => chart.name === fullName));
    const isPositive = change > 0;

    const handleClick = () => {
        dispatch(hideTicker(shortName));
        setIsShown(!isShown);
    }

    return (
        <>
            {isShown && <div className="ticker-container" >
                <div className="ticker" onClick={() => setShowChart(!showChart)}>
                    <div className="short-name">{shortName}</div>
                    <div className="full-name">{fullName}</div>
                    <div className="price">{price} $</div>
                    <div className={`change ${isPositive ? "change-positive" : "change-negative"}`}>{change}</div>
                    <div className={`change-percent ${isPositive ? "change-positive" : "change-negative"}`}>{change_percent}%</div>
                    <img alt='hide-icon' src={hideIcon} onClick={handleClick} />
                </div>
                {showChart && <div className="prices-chart">
                    <PricesChart prices={chartData.data} /></div>}
            </div>}
        </>)
}

export default TickerRow;