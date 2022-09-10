"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {
  store: new JsonStore("./models/station-store.json", { stationCollection: [] }),
  collection: "stationCollection",

  /**
   * Method to return all stations within the collection
   * @returns {*}
   */
  getAllStations() {
    return this.store.findAll(this.collection);
  },

  /**
   * Method to return a single station based on the station id
   * @param id
   * @returns {*}
   */
  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  /**
   * Method to add a new station object to the station collection
   * @param station
   */
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  /**
   * Method to remove a station from the station collection
   * @param id
   */
  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  /**
   * Method to remove all stations from the collection
   */
  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  /**
   * Method to remove a reading from a station. Station id is used to identify the station the reading is belonging to
   * Reading id is used to identify the reading
   * @param id
   * @param readingId
   */
  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  /**
   * Method which accepts a station ID and a reading in order to add a new reading to the station
   * @param id
   * @param reading
   */
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  /**
   * Method which returns the stations associated with the passed in userId
   * @param userid
   * @returns {*}
   */
  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = stationStore;
