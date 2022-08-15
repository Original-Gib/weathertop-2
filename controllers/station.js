'use strict';

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");

const station = {
  index(request,response){
    const stationId = request.params.id;
    logger.info("Station ID = "+ stationId);
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
    }
    response.render('station', viewData);
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