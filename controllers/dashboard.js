"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store.js");
const stationAnalytics = require("../utils/station-analytics");
const { response } = require("express");
const station = require("./station");
const accounts = require("./accounts.js");

const dashboard = {
  /**
   * Index method to load the users dashboard. BUG: I am unable to get the station summary to work on the dashboard
   * I have included the for of loop I was using to test and troubleshoot, however I have been unable to pass each
   * individual station in to allow the station summary to work properly
   * @param request
   * @param response
   */
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    let stations = stationStore.getUserStations(loggedInUser.id);
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
    for (let station of stations) {
      latestReading = stationAnalytics.getLatestReading(station);
    }
    let viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
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
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  /**
   * Method to add a station using the form on the users dashboard. Station is added to the logged in users station list
   * @param request
   * @param response
   */
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
    response.redirect("/dashboard");
  },

  /**
   * Method to delete the station for the user. Station is identified by getting the id and this is then passed into
   * the stationstore.removeStation method
   * @param request
   * @param response
   */
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info("Deleting station: " + stationId);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard/");
  },
};

module.exports = dashboard;
