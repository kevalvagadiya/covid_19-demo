import React, { useEffect, useState } from 'react'
import { Cards, Charts, CountryPicker/*, DateChart */ } from './components'
import styles from './app.module.css'
import coronaImage from './image/covid19.jpg'
import { fetchData, fetchCountries, store } from './api'
import ls from 'local-storage';
import { connect } from 'react-redux'

const Home = (props) => {
    const { userData } = props
    const [state, setState] = useState()

    useEffect(() => {
        function fetchApi() {
            store.dispatch(fetchCountries())
        }
        fetchApi()
    }, [])
    useEffect(() => {
        setState(userData)
        if (userData && userData.history) {
            ls.set("history", userData.history)
        }
    }, [userData])
    // const memoizedValue = useMemo(() => handleCountryChange(country), [country]);

    const handleCountryChange = async (country) => {
        store.dispatch(fetchData(country))
    }
    if (state && state.countryData) {
        if (state.error) {
            return (
                <div className={styles.container}>
                    <h2>{state.error}</h2>
                </div>
            )
        }
        let chartData = { country: state.cardData.country, chartData: state.chartData.data };
        if (state.cardData.data) {
            if (state.cardData.country !== "Global") {
                chartData = state.cardData
            }
            return (
                < div className={styles.container} >
                    <img className={styles.image} src={coronaImage} alt="COVID-19"></img>
                    <CountryPicker data={state.countryData} defaultCountry={state.country} handleCountryChange={handleCountryChange} />
                    <Cards data={state.cardData.data} />
                    <Charts data={chartData} />
                </div >
            )
        } else {
            return (

                < div className={styles.container} >
                    <img className={styles.image} src={coronaImage} alt="COVID-19"></img>
                    <CountryPicker data={state.countryData} country={state.country} handleCountryChange={handleCountryChange} />
                    <h6>Please select a Country</h6>
                </div >

            )
        }
    } else {
        return null
    }
}



const mapStateToProps = state => {
    return {
        userData: state
    }
}

export default connect(mapStateToProps)(Home)
