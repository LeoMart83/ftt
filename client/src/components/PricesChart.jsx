import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useState } from 'react';
import { getPricesWithInterval } from "../helpers/getPricesWithInterval"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const PricesChart = ({ prices }) => {

    const [timeInterval, setTimeInterval] = useState(60000);

    const labelsData = getPricesWithInterval(prices, timeInterval).map(({ date }) => moment(date).format('MMM Do, H:mm:ss'));
    const pricesData = getPricesWithInterval(prices, timeInterval).map(({ price }) => price);

    const data = {
        labels: labelsData,
        datasets: [
            {
                fill: true,
                label: 'Price',
                data: pricesData,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(249, 131, 13, 0.7)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 500,
            }
        }
    }

    return (<>
        <div className="interval-buttons">
            <button className={`${timeInterval === 60000 ? "active-interval" : ""} `} onClick={() => setTimeInterval(60000)}>1 m</button>
            <button className={`${timeInterval === 300000 ? "active-interval" : ""} `} onClick={() => setTimeInterval(300000)}>5 m</button>
            <button className={`${timeInterval === 600000 ? "active-interval" : ""} `} onClick={() => setTimeInterval(600000)}>10 m</button>
            <button className={`${timeInterval === 'max' ? "active-interval" : ""} `} onClick={() => setTimeInterval('max')}>Max</button>
        </div>
        <Line data={data} options={options} />
    </>)
}

export default PricesChart;