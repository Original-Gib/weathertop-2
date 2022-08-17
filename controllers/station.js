'use strict';

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const stationAnalytics = require("../utils/station-analytics");

const station = {
  index(request,response){
    const stationId = request.params.id;
    logger.info("Station ID = "+ stationId);
    const station = stationStore.getStation(stationId);
    const latestReading = stationAnalytics.getLatestReading(station);
    const maxTemp = stationAnalytics.getMaxTemperature(station);
    const minTemp = stationAnalytics.getMinTemperature(station);
    const fahrenheit = stationAnalytics.celciusToFahrenheit(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const minPressure = stationAnalytics.getMinPressure(station);
    const beaufort = stationAnalytics.beaufortConversion(station);
    const windDirectionCompass = stationAnalytics.windCompassDirection(station);
    const maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    const minWindSpeed = stationAnalytics.getMinWindSpeed(station)
    const windChill = stationAnalytics.calculateWindChill(station);
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      latestReading: latestReading,
      maxTemp: maxTemp,
      minTemp: minTemp,
      fahrenheit: fahrenheit,
      maxPressure: maxPressure,
      minPressure: minPressure,
      beaufort: beaufort,
      windDirectionCompass: windDirectionCompass,
      maxWindSpeed: maxWindSpeed,
      minWindSpeed: minWindSpeed,
      windChill: windChill,
    }
    response.render('station', viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },

  addReading(request, response){
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      code: request.body.code,
      temperature: request.body.temperature,
      windspeed: request.body.windspeed,
      winddirection: request.body.winddirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;