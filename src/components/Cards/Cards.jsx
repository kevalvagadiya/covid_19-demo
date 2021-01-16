import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import CountUp from 'react-countup'
import styles from './Cards.module.css'
import cx from 'classnames'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (confirmed === undefined) {
        return 'Please select a Country';
    }
    return (
        < div className={styles.container} >
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent >
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography varaint="h5" >
                            <CountUp className={styles.caseVal} start={0} end={confirmed.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography varaint="body2" >Number of Active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent >
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography varaint="h5" >
                            <CountUp className={styles.caseVal} start={0} end={recovered.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography varaint="body2" >Number of Recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent >
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography varaint="h5" >
                            <CountUp className={styles.caseVal} start={0} end={deaths.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography varaint="body2" >Number of Deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div >
    )
}

export default Cards