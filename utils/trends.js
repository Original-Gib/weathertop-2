"use strict";

const trends = {
  /**
   * Method to get the dates of the readings to display on the Frappe charts
   * @param station
   * @returns {null}
   */
  getTrendLabelData(station) {
    let trendLabels = null;

    if (station.readings.length > 0) {
      trendLabels = [];
      for (let i = 0; i < station.readings.length; i++) {
        let date = new Date(station.readings[i].date);
        trendLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }
    return trendLabels;
  },

  /**
   * Method which gets the temperature data to be displayed on the Frappe chart
   * @param station
   * @returns {null}
   */
  temperatureTrendData(station) {
    let tempTrend = null;
    if (station.readings.length > 0) {
      tempTrend = [];
      for (let i = 0; i < station.readings.length; i++) {
        tempTrend.push(station.readings[i].temperature);
      }
    }
    return tempTrend;
  },

  /**
   * Method which gets the windSpeed data to be displayed on the Frappe chart
   * @param station
   * @returns {null}
   */
  windSpeedTrendData(station) {
    let windSpeedChartTrend = null;
    if (station.readings.length > 0) {
      windSpeedChartTrend = [];
      for (let i = 0; i < station.readings.length; i++) {
        windSpeedChartTrend.push(station.readings[i].windspeed);
      }
    }
    return windSpeedChartTrend;
  },

  /**
   * Method which gets the pressure data to be displayed on the Frappe chart
   * @param station
   * @returns {null}
   */
  pressureTrendData(station) {
    let pressureChartTrend = null;
    if (station.readings.length > 0) {
      pressureChartTrend = [];
      for (let i = 0; i < station.readings.length; i++) {
        pressureChartTrend.push(station.readings[i].pressure);
      }
    }

    return pressureChartTrend;
  },
};

module.exports = trends;
