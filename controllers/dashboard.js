"use strict";

const logger = require("../utils/logger");
const uuid = require('uuid');
const stationStore = require("../models/station-store.js");
const stationAnalytics = require("../utils/station-analytics");
const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const stations = stationStore.getAllStations();
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
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
