"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js");

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);

router.get("/station/:id", station.index);
router.get("/station/:id/deletereading/:readingid", station.deleteReading);
router.post("/station/:id/addreading", station.addReading);
router.post("/station/:id/addreport", station.addReport);

router.post("/dashboard/addstation", dashboard.addStation);
router.get("/station/:id/deletestation/", dashboard.deleteStation);

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.get("/account", accounts.viewAccount);
router.post("/editdetails", accounts.editDetails);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

module.exports = router;
