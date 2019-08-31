"use strict";
const uuid = require('uuid');
const logger = require("../utils/logger");


const assessmentCollection = require('../models/assessment-store.js');
const userCollection = require('../models/user-store');
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
            //bmi:util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))
            bmi: Number(util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))),
            idealWeightInd: util.isIdealWeight(loggedInUser)
        };
        const viewDataTrainer = {
            title: "Play Gym Trainer Dashboard",
            members:accounts.getTrainersMembers(loggedInUser.id),
            user:accounts.getCurrentUser(request).firstName.concat(accounts.getCurrentUser(request).lastName),
            bmi:util.calculateBMI(accounts.getCurrentUser(request),assessmentCollection.getUserAssessmets(loggedInUser.id))
        };

        logger.info('about to render' ); //come back to this to see if it logs correctly
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
            date:  new Date(),
            weight: Number(request.body.weight),
            chest: Number(request.body.chest),
            thigh: Number(request.body.thigh),
            upperArm: Number(request.body.upperArm),
            waist: Number(request.body.waist),
            hips: Number(request.body.hips),
            comment:""


        };
        assessmentCollection.addAssessment(newAssessment);
        userCollection.updateCurrentWeight(loggedInUser,newAssessment);
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

    userProfile(request,response){
        const loggedInUser = accounts.getCurrentUser(request);
        const viewData ={
            title:"User Account Profile",
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName

        }

        response.render('account', viewData);
        logger.info(`logging in ${loggedInUser.email}`);


    },
    updateProfile(request,response){
        logger.info(`logging in ${request.body.firstName}`);
        const loggedInUser = accounts.getCurrentUser(request);
        userCollection.updateMemberDetails(loggedInUser,request)


        response.redirect('/');


    }

};

module.exports = dashboard;
