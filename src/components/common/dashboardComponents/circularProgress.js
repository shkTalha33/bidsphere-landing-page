
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 95;
const CircularProgessBar = () => {

    const styles = buildStyles({
        strokeLinecap: 'butt',
        textColor: '#7f55df',
        pathColor: '#CBC2E3',
        trailColor: '#fff',
        backgroundColor: '#CBC2E3',
        text: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '5px 10px',
            borderRadius: '50%',
        },
    });

    return (
        <>
            <CircularProgressbar
                className='max-w-[10rem] h-auto'
                value={percentage}
                strokeWidth={10}
                styles={styles}
                text={1.145}
            />
        </>
    )
}

export default CircularProgessBar;
