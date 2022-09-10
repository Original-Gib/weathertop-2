"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const stationAnalytics = require("../utils/station-analytics");
const axios = require("axios");
const trends = require("../utils/trends");

const station = {
  /**
   * Index method to render the station based off the station id
   * @param request
   * @param response
   */
  index(request, response) {
    const stationId = request.params.id;
    logger.info("Station ID = " + stationId);
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
      },
      trendlabel: trends.getTrendLabelData(station),
      temperatureChartTrend: trends.temperatureTrendData(station),
      windSpeedChartTrend: trends.windSpeedTrendData(station),
      pressureChartTrend: trends.pressureTrendData(station),
    };
    logger.info("about to render" + stationStore.getStation(stationId));
    console.log(trends.getTrendLabelData(station));
    response.render("station", viewData);
  },

  /**
   * Method to delete a reading. Method gets the station id and the reading id and passes them into the
   * stationStore.removeReading method
   * @param request
   * @param response
   */
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  /**
   * Method to add a reading based off the details the user enters in the form on the station page. New reading onbject
   * is created from the form details and this is then passed into the stationStore.addReading method.
   *
   * validation is performed on the details entered by the user before it will be accepted. If inaccurate details are
   * entered the user is brought back to the station page without the new reading being entered
   * @param request
   * @param response
   */
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    let date = null;
    date = new Date();
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windspeed: Number(request.body.windspeed),
      winddirection: Number(request.body.winddirection),
      pressure: Number(request.body.pressure),
      date: date.toGMTString(),
    };
    if (
      newReading.code % 100 === 0 &&
      newReading.temperature < 60 &&
      newReading.temperature > -90 &&
      newReading.winddirection >= 0 &&
      newReading.winddirection <= 360
    ) {
      stationStore.addReading(stationId, newReading);
      response.redirect("/station/" + stationId);
    } else {
      logger.info("Invalid reading parameters entered");
      response.redirect("/station/" + stationId);
    }
  },

  /**
   * Method to request data from OpenAPI based off the stations latitude and longitude values. Returned data is then
   * mapped to data required for a reading. This is then added to the station using the addReading method.
   * @param request
   * @param response
   * @returns {Promise<void>}
   */
  async addReport(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lat = station.latitude;
    const long = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d52e00baa769d246e850c002f3093f85`;
    const result = await axios.get(requestUrl);
    if (result.status === 200) {
      console.log(result.data);
      const newReport = {
        id: uuid.v1(),
        code: Number(result.data.weather[0].id),
        temperature: Number(result.data.main.temp),
        windspeed: Number(result.data.wind.speed),
        winddirection: Number(result.data.wind.deg),
        pressure: Number(result.data.main.pressure),
        date: result.headers.date,
      };
      stationStore.addReading(stationId, newReport);
    }
    logger.info("Adding new report to " + station.station);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
