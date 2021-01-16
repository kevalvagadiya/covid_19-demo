import axios from 'axios'
const url = 'https://covid19.mathdro.id/api'
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const ls = require('local-storage')

const initialState = {
    loading: false,
    cardData: {},
    chartData: {},
    countryData: {},
    history: ls.get("history") ? ls.get("history") : [],
    country: '',
    error: ''
}
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_CARD_DATA_SUCCESS = 'FETCH_CARD_DATA_SUCCESS'
const FETCH_CHART_DATA_SUCCESS = 'FETCH_CHART_DATA_SUCCESS'
const FETCH_COUNTRY_DATA_SUCCESS = 'FETCH_COUNTRY_DATA_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchCardDataSuccess = data => {
    return {
        type: FETCH_CARD_DATA_SUCCESS,
        payload: data
    }
}
export const fetchChartDataSuccess = data => {
    return {
        type: FETCH_CHART_DATA_SUCCESS,
        payload: data
    }
}
const fetchCountryDataSuccess = data => {
    return {
        type: FETCH_COUNTRY_DATA_SUCCESS,
        payload: data
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CARD_DATA_SUCCESS:
            if (state.history.length === 10) {
                state.history.splice(0, 1);
            }

            if (!action.payload.country) {
                return {
                    ...state,
                    loading: false,
                    cardData: {},
                    country: '',
                    error: ''
                }
            }
            return {
                ...state,
                loading: false,
                cardData: { data: action.payload.data, country: action.payload.country },
                history: [...state.history, action.payload],
                country: action.payload.country,
                error: ''
            }

        case FETCH_CHART_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                chartData: action.payload,
                error: ''
            }
        case FETCH_COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                countryData: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:

    }
}

export const fetchData = (country) => {
    let changableURL = url;
    let dailyUrl = `${url}/daily`

    if (country === "Global") {
        changableURL = url;
    } else {
        changableURL = `${url}/countries/${country}`
    }

    let cardData;
    let chartData;
    return async function (dispatch) {
        dispatch(fetchUserRequest)

        if (country === "Global") {
            await axios.get(dailyUrl)
                .then(chartResponse => {
                    chartData = { data: chartResponse.data }
                })
                .catch(error => {
                    dispatch(fetchUserFailure(error.message))
                })
            dispatch(fetchChartDataSuccess(chartData))
        }

        await axios.get(changableURL)
            .then(async (cardResponse) => {
                if (country === "Global") {
                    cardData = { country: country, data: cardResponse.data, chartData: chartData.data }
                } else {
                    cardData = { country: country, data: cardResponse.data }
                }
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
        dispatch(fetchCardDataSuccess(cardData))
    }
}
export const fetchCountries = () => {
    let changableURL = `${url}/countries`;
    return function (dispatch) {
        dispatch(fetchUserRequest)
        axios.get(changableURL)
            .then(response => {
                const data = response.data
                dispatch(fetchCountryDataSuccess(data))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))
