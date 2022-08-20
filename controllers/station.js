'use strict';

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require('uuid');
const stationAnalytics = require("../utils/station-analytics");

const station = {
  index(request,response){
    const stationId = request.params.id;
    logger.info("Station ID = "+ stationId);
    const station = stationStore.getStation(stationId);
    const viewData = {
      title: "Station",
      station: station,
      stationsummary: {
        latestReading: stationAnalytics.getLatestReading(station),
        maxTemp: stationAnalytics.getMaxTemperature(station),
        minTemp: stationAnalytics.getMinTemperature(station),
        fahrenheit: stationAnalytics.celciusToFahrenheit(station),
        maxPressure: stationAnalytics.getMaxPressure(station),
        minPressure: stationAnalytics.getMinPressure(station),
        beaufort: stationAnalytics.beaufortConversion(station),
        windDirectionCompass: stationAnalytics.windCompassDirection(station),
        maxWindSpeed: stationAnalytics.getMaxWindSpeed(station),
        minWindSpeed: stationAnalytics.getMinWindSpeed(station),
        windChill: stationAnalytics.calculateWindChill(station),
      }
    }
    logger.info('about to render' + stationStore.getStation(stationId))
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
      id: uuid.v1(),
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

