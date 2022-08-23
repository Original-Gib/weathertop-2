'use strict';

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require('uuid');
const stationAnalytics = require("../utils/station-analytics");
const axios = require("axios");

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
        weatherCondition: stationAnalytics.getWeatherFromCode(station),
        weatherConditionIcon: stationAnalytics.getWeatherIconFromCode(station),
        temperatureTrend: stationAnalytics.trendIcon(stationAnalytics.temperatureTrend(station)),
        pressureTrend: stationAnalytics.trendIcon(stationAnalytics.pressureTrend(station)),
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
    let date = null;
    date = new Date();
    const newReading = {
      id: uuid.v1(),
      code: Number (request.body.code),
      temperature: Number (request.body.temperature),
      windspeed: Number (request.body.windspeed),
      winddirection: Number (request.body.winddirection),
      pressure: Number (request.body.pressure),
      date: date.toGMTString(),

    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },

    async addReport(request, response) {
    let report = {};
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lat = station.latitude;
    const long = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d52e00baa769d246e850c002f3093f85`;
    const result = await axios.get(requestUrl);
    if (result.status === 200){
      const newReport ={
      }

    }
    logger.info('Adding new report to ' + station.station);
    const viewData = {
      title: 'Weather Report',
      reading: report
    };
    response.render("station", viewData);
  },
};

module.exports = station;

