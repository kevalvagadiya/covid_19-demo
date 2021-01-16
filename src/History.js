import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./app.module.css";
import { Charts } from "./components";

import ls from "local-storage";
// import { Bar } from 'react-chartjs-2';

class History extends Component {
  state = {
    history: [],
    chartData: {},
  };

  componentDidMount() {
    this.setState({ history: ls.get("history") });
  }

  render() {
    const userData = this.state.history;
    const handleClick = (e, i) => {
      const countryData = userData.filter(
        (target, index) => target.country === e && index === i
      );
      const cData = countryData[0];
      this.setState({ chartData: { data: cData, token: i } });
    };

    const handleDelete = (e, i) => {
      const countryData = userData.filter((target, index) => index !== i);
      const cData = countryData;
      ls.set("history", cData);
      if (this.state.chartData && this.state.chartData.token === i) {
        return this.setState({ history: cData, chartData: null });
      }
      // else {
      //     const data = cData.filter((target, index) => target.country === this.state.chartData.data.country)
      //     console.log(data);
      // }
      this.setState({ history: cData });
    };
    if (userData) {
      const history = userData;
      if (history && history.length > 0) {
        return (
          <div className={styles.container}>
            <h2>HISTORY</h2>
            <div className={styles.allHistory}>
              {history.map((countryData, i) => (
                <div key={i} className={styles.historyList}>
                  <div className={styles.historyTitle}>
                    <h6>{countryData.country} </h6>
                  </div>
                  <div className={styles.historyButton}>
                    <button
                      className={styles.histbtn}
                      onClick={() => {
                        handleClick(countryData.country, i);
                      }}
                    >
                      Load
                    </button>
                  </div>
                  <div className={styles.historyDelete}>
                    <button
                      className={styles.histDlt}
                      onClick={() => {
                        handleDelete(countryData.country, i);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {this.state.chartData ? (
              <Charts data={this.state.chartData.data} />
            ) : null}
          </div>
        );
      }
    }

    return (
      <div className={styles.container}>
        <h2>HISTORY</h2>
        <h6>History is not Available</h6>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps)(History);
