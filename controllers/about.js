"use strict";

const logger = require("../utils/logger");

const about = {
  /**
   * Index method to render the about page
   * @param request
   * @param response
   */
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About WeatherTop",
    };
    response.render("about", viewData);
  },
};

module.exports = about;
