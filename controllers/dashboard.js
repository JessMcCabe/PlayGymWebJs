"use strict";
const uuid = require('uuid');
const logger = require("../utils/logger");


const assessmentCollection = require('../models/assessment-store.js');
const accounts = require ('./accounts.js');
const util = require ('./utility.js');

const dashboard = {
    index(request, response) {
        logger.info("dashboard rendering");
        const loggedInUser = accounts.getCurrentUser(request);
        const viewDataMember = {
            title: "Play Gym Dashboard",
            assessment:assessmentCollection.getUserAssessmets(loggedInUser.id),
            user:accounts.getCurrentUser(request).firstName.concat(accounts.getCurrentUser(request).lastName),
            bmi:util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))
        };
        const viewDataTrainer = {
            title: "Play Gym Trainer Dashboard",
            members:accounts.getTrainersMembers(loggedInUser.id),
            user:accounts.getCurrentUser(request).firstName.concat(accounts.getCurrentUser(request).lastName),
            bmi:util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))
        };

        logger.info('about to render'); //come back to this to see if it logs correctly
        if(loggedInUser.type==="member"){
            response.render("dashboard", viewDataMember);
        }
        else
        {
            response.render("trainerdashboard", viewDataTrainer);
        }
    },

    addAssessment(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const newAssessment = {
            id: uuid(),
            userId: loggedInUser.id,
            weight: request.body.weight,
            chest: request.body.chest,
            thigh: request.body.thigh,
            upperArm: request.body.upperArm,
            waist: request.body.waist,
            hips: request.body.hips,


        };
        assessmentCollection.addAssessment(newAssessment);
        response.redirect('/dashboard');
    },
    deleteAssessment(request,response) {
        const id = request.params.id;
        logger.debug('Deleting assessment ${id}');
        assessmentCollection.removeAssessment(id);
        response.redirect('/dashboard');
    },

    getMemberAssessments(request,response){
        const member = request.params.id;
        assessmentCollection.getUserAssessmets(member)
        response.redirect('/dashboard')
    },



};

module.exports = dashboard;
