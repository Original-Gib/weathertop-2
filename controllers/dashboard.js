"use strict";

const logger = require("../utils/logger");
const uuid = require('uuid');
const stationStore = require("../models/station-store.js");
const stationAnalytics = require("../utils/station-analytics");
const { response } = require("express");
const station = require("./station");
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    let station = null;
    let latestReading = null;
    let maxTemp = null;
    let minTemp = null;
    let fahrenheit = null;
    let maxPressure = null;
    let minPressure = null;
    let beaufort = null;
    let windChill = null;
    let windDirectionCompass = null;
    let maxWindSpeed = null;
    let minWindSpeed = null;
    // for(station of stations) {
    //   latestReading = stationAnalytics.getLatestReading(station);
    //   maxTemp = stationAnalytics.getMaxTemperature(station);
    //   minTemp = stationAnalytics.getMinTemperature(station);
    //   fahrenheit = stationAnalytics.celciusToFahrenheit(station);
    //   maxPressure = stationAnalytics.getMaxPressure(station);
    //   minPressure = stationAnalytics.getMinPressure(station);
    //   beaufort = stationAnalytics.beaufortConversion(station);
    //   windDirectionCompass = stationAnalytics.windCompassDirection(station);
    //   maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    //   minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    //   windChill = stationAnalytics.calculateWindChill(station);
    // }
    let viewData = {
        title: "Station Dashboard",
        stations: stationStore.getUserStations(loggedInUser.id),
        station: station,
        stationsummary: {
          latestReading: latestReading,
          maxTemp: maxTemp,
          minTemp: minTemp,
          fahrenheit: fahrenheit,
          maxPressure: maxPressure,
          minPressure: minPressure,
          beaufort: beaufort,
          windDirectionCompass: windDirectionCompass,
          windChill: windChill,
          maxWindSpeed: maxWindSpeed,
          minWindSpeed: minWindSpeed,
        },
      }
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      station: request.body.station,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },

  deleteStation(request, response){
    const stationId = request.params.id;
    logger.info('Deleting station: ' + stationId)
    stationStore.removeStation(stationId);
    response.redirect('/dashboard/')
  }
};

module.exports = dashboard;
