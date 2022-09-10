"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  /**
   * Index method to render the index page
   * @param request
   * @param response
   */
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  /**
   * Method to render the login page
   * @param request
   * @param response
   */
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  /**
   * Method to log the user out of the site. Cookie is cleared within here
   * @param request
   * @param response
   */
  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  /**
   * Method for rendering the signup page
   * @param request
   * @param response
   */
  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup", viewData);
  },

  /**
   * Method which takes the details entered by the user in the Signup page and passes them to the userstore to
   * create the user.
   * id is assigned for the user via uuid
   * @param request
   * @param response
   */
  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  /**
   * Method to authenticate the user. Takes the email and password from the form the user fills in on the login page
   * and checks if the user exists and if the password matches that users password
   * @param request
   * @param response
   */
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = request.body.password;
    if (user && password === user.password) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  /**
   * Method to get the current logged in user
   * @param request
   * @returns {*}
   */
  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },

  /**
   * Method to load the users account page
   * @param request
   * @param response
   */
  viewAccount(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Account Info",
      firstname: loggedInUser.firstName,
      lastname: loggedInUser.lastName,
      email: loggedInUser.email,
    };
    response.render("account", viewData);
  },

  /**
   * Method to allow the user to edit their details on the account page
   * @param request
   * @param response
   */
  editDetails(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const updatedUser = {
      firstName: request.body.firstname,
      lastName: request.body.lastname,
      email: request.body.email,
      password: request.body.password,
    };
    userstore.updateUser(loggedInUser, updatedUser);
    response.cookie("station", updatedUser.email);
    response.redirect("account");
  },
};

module.exports = accounts;
