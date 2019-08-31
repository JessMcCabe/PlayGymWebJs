"use strict";
const uuid = require('uuid');
const logger = require("../utils/logger");


const assessmentCollection = require('../models/assessment-store.js');
const users = require('../models/user-store.js');
const accounts = require ('./accounts.js');
const util = require ('./utility.js');

const trainerDashboard = {
    index(request, response) {
        logger.info("trainer dashboard rendering");
        const loggedInUser = accounts.getCurrentUser(request);

        const viewDataTrainer = {
            title: "Play Gym Trainer Dashboard",
            members:accounts.getTrainersMembers(loggedInUser.id),
            user:accounts.getCurrentUser(request).firstName.concat(accounts.getCurrentUser(request).lastName),
            bmi:util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))
        };

        logger.info('about to render'); //come back to this to see if it logs correctly
        response.render("trainerdashboard", viewDataTrainer);

    },


    getMemberAssessments(request,response){
        const viewTrainerMember = {
            title: "Play Gym Trainer Dashboard",
            member: request.params.id,
            name: users.getUserById(request.params.id).firstName,
            user: users.getUserById(request.params.id).firstName.concat(users.getUserById(request.params.id).lastName),
            bmi: util.calculateBMI(users.getUserById(request.params.id)),
            idealWeightInd: util.isIdealWeight(users.getUserById(request.params.id)),
            assessment:assessmentCollection.getUserAssessmets(request.params.id),
            bmiCategory: util.determineBMICategory(users.getUserById(request.params.id))
        };

        response.render("trainermemberdetails",viewTrainerMember);
    },

    addAssessmentComment(request, response) {

        const assessmentid = (request.params.id)
        const comment = request.body.comment

        assessmentCollection.addAssessmentComment(assessmentid,comment);
        response.redirect("/dashboard");
    },

    deleteMember(request, response) {
        const user = request.params.id;
        users.deleteUser(user);
        response.redirect('/dashboard');
    },
};

module.exports = trainerDashboard;
