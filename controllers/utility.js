"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const user = require('../models/user-store.js');


const utility = {

    calculateBMI(user){

        //logger.info( user.currentWeight );
         return Math.round(user.currentWeight / (user.height * user.height)*100)/100;
        //return typeof  user.currentWeight  ;


    }
};

module.exports = utility;