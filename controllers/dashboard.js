"use strict";
const uuid = require('uuid');
const logger = require("../utils/logger");


const assessmentCollection = require('../models/assessment-store.js');
const accounts = require ('./accounts.js');
const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Play Gym Dashboard",
      assessment:assessmentCollection,
    };
     logger.info('about to render'); //come back to this to see if it logs correctly
    response.render("dashboard", viewData);
  },
  
   addAssessment(request, response) {
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
