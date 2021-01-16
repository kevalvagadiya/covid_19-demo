import React from 'react';
// import { fetchDailyData, store } from '../../api';


import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'

// import { connect } from 'react-redux'


const Chart = ({ data }) => {
    if (!data) {
        return null
    }
    let dailyData = data;

    const { country } = data

    let confirmed;
    let recovered;
    let deaths;
    if (country) {
        if (country !== "Global") {
            confirmed = dailyData.data.confirmed
            recovered = dailyData.data.recovered
            deaths = dailyData.data.deaths
        } else {
            dailyData = data.chartData

        }
    }
    // useEffect(() => {
    //     store.dispatch(fetchDailyData())
    // }, [])

    const lineChart = (
        dailyData && dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ reportDate }) => reportDate),
                datasets: [{
                    data: dailyData.map(({ totalConfirmed }) => totalConfirmed),
                    label: "Infected",
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths.total),
                    label: "Deaths",
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: [
                            ' rgba(0, 0, 255, 0.5)',
                            ' rgba(0, 255, 0, 0.5)',
                            ' rgba(255, 0, 0, 0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `current state in ${country}` }
                }} />
        ) : null
    )
    return (
        <div className={styles.container}>
            {country !== "Global" ? barChart : lineChart}
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         userData: state
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchDailyData: () => dispatch(fetchDailyData())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Chart)


export default Chart;