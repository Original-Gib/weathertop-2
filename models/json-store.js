"use strict";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

class JsonStore {
  constructor(file, defaults) {
    const adapter = new FileSync(file);
    this.db = low(adapter);
    this.db.defaults(defaults).value();
  }

  /**
   * Method to save information to the station store
   */
  save() {
    this.db.write();
  }

  /**
   * Method to add an object to a collection (station to the station store)
   * @param collection
   * @param obj
   */
  add(collection, obj) {
    this.db.get(collection).push(obj).last().value();
  }

  /**
   * Removed object from a collection (station from station store)
   * @param collection
   * @param obj
   */
  remove(collection, obj) {
    this.db.get(collection).remove(obj).value();
  }

  /**
   * Method to remove the entire collection (station store)
   * @param collection
   */
  removeAll(collection) {
    this.db.get(collection).remove().value();
  }

  /**
   * Method to fina all collections in a store
   * @param collection
   * @returns {*}
   */
  findAll(collection) {
    return this.db.get(collection).value();
  }

  /**
   * Method to find one collection within the station store
   * @param collection
   * @param filter
   * @returns {*}
   */
  findOneBy(collection, filter) {
    const results = this.db.get(collection).filter(filter).value();
    return results[0];
  }

  /**
   * Method to find a collection from its ID
   * @param collection
   * @param ids
   * @returns {*}
   */
  findByIds(collection, ids) {
    return this.db.get(collection).keyBy("id").at(ids).value();
  }

  findBy(collection, filter) {
    return this.db.get(collection).filter(filter).value();
  }
}

module.exports = JsonStore;
