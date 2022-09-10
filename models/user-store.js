"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  /**
   * Method to return all users within the collection
   * @returns {*}
   */
  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  /**
   * Method to add a new user to the collection
   * @param user
   */
  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  /**
   * Method which returns a user based on the id which is passed in to the arguments
   * @param id
   * @returns {*}
   */
  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  /**
   * Method to retrieve a user from the collection via the users email
   * @param email
   * @returns {*}
   */
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  /**
   * Method to update the users details. Used within the account page in the edit details form.
   * @param user
   * @param updatedUser
   */
  updateUser(user, updatedUser) {
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    this.store.save();
  },
};

module.exports = userStore;
