"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const user = require('../models/user-store.js');


const utility = {

    calculateBMI(user,assessment){
        const user1 = user;
        return user1.weight / (user1.height*user1.height);

        //weight/(height*height)
    }
};

module.exports = utility;