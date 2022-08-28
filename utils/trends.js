'use strict';

const trends = {

  getTrendLabelData(station){
    let trendLabels = null;

    if (station.readings.length > 0){
      trendLabels = [];
    for (let i = 0; i < station.readings.length; i++){
      let date = new Date(station.readings[i].date);
    trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
    }
    }
    return trendLabels;
  },

  temperatureTrendData(station){
    let tempTrend = null;
    if (station.readings.length > 0){
      tempTrend = [];
      for (let i = 0; i < station.readings.length; i++){
        tempTrend.push(station.readings[i].temperature) }
    }
    return tempTrend;
  },

  windSpeedTrendData(station){
    let windSpeedChartTrend = null;
    if (station.readings.length > 0){
      windSpeedChartTrend = [];
      for (let i = 0; i < station.readings.length; i++){
        windSpeedChartTrend.push(station.readings[i].windspeed) }
    }
    return windSpeedChartTrend;
  },


}

module.exports = trends;