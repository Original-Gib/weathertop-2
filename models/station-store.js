"use strict";

const _ = require("lodash");

const stationStore = {

  stationCollection: require('./station-store.json').stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    let foundStation = null;
    for (let station of this.stationCollection) {
      if (id == station.id) {
        foundStation = station;
      }
    }
    return foundStation;
  },

  addReading (id, reading){
    const station = this.getStation(id);
    station.readings.push(reading);
  }
};

  module.exports = stationStore;

