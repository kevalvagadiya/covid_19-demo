import React, { useState, useEffect } from 'react';
// import { fetchDate } from '../../api';
import { Line } from 'react-chartjs-2';


import styles from './Chart.module.css'

const DateChart = (data, country) => {
    console.log(data);
    console.log(country);

    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDate())
        }
        fetchApi()
    }, [])
    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ newCase }) => newCase),
                    label: "NewCases",
                    borderColor: '#3333ff',
                    fill: true
                }],
            }}
        />) : null
    );


    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}



export default DateChart;