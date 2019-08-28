"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts = require('./controllers/accounts.js');
const trainerdashboard = require('./controllers/TrainerDashboard.js');

//router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/account",dashboard.userProfile);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.post('/dashboard/updateProfile',dashboard.updateProfile);
router.post('/dashboard/addassessment/', dashboard.addAssessment);
router.post('/trainerdashboard/addassessmentcomment/:id/Comment',trainerdashboard.addAssessmentComment);

router.get('/dashboard/deleteAssessment/:id',dashboard.deleteAssessment);
router.get('/trainerdashboard/deleteMember/:id',trainerdashboard.deleteMember);
router.get('/dashboard/member/:id/assessments',trainerdashboard.getMemberAssessments);


module.exports = router;
