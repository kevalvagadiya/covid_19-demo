import React from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

// import { fetchCountries, store } from '../../api'
import styles from './CountryPicker.module.css'

const ContryPicker = ({ data: { countries }, defaultCountry, handleCountryChange }) => {
    // console.log(country);


    if (countries) {
        const country = countries.map(country => country.name)
        return (
            <FormControl className={styles.formControl}  >
                <NativeSelect defaultValue={defaultCountry} onChange={(e) => handleCountryChange(e.target.value)} >
                    <option value="">select</option>
                    <option value="Global" >Global</option>
                    {country.map((country, i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        )
    } else {
        return null;
    }
}
export default ContryPicker;