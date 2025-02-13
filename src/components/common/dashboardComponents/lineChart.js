import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: false,
        tooltip: {
            mode: 'index',
            intersect: false,
        },
    },
    scales: {
        x: {
            ticks: {
                font: 'text-sm text-[#8E95A9] inter_medium',
            },
        },
        y: {
            min: 2,
            max: 30,
            ticks: {
                borderDraw: false,
                font: 'manrope_bold',
                callback: function (value) {
                    return value + 'k';
                },
            },
            grid: {
                display: false,
                borderDash: [10],
            },
        },
    },
};


export const data = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            data: [23, 15, 29, 10, 23, 15, 30, 15, 15, 20, 15, 30],
            borderColor: '#CBC2E3',
            borderWidth: 3,
            backgroundColor: 'rgba(98, 60, 234, 0.08)',
            pointBorderColor: 'transparent',
            pointBackgroundColor: '#CBC2E3',
            pointBorderWidth: 20,
            Filler: true,
        },
    ],
};

export function LineChart() {
    return (
        <>
            <div className="flex justify-between items-center w-full  mb-[24px] lg:mb-[48px]">
                <span className='text-[#6C7278] popins_semibold text-sm'>Average Customer Visit</span>
            </div>
            <div className="w-full flex justify-center">
                <Line options={options} data={data} className='h-full lg:max-h-[15rem] w-full' />
            </div>
        </>
    );
}
