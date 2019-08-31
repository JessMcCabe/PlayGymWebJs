"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const user = require('../models/user-store.js');

const maleBaseWeight = 50;
const femaleBaseWeight = 45.5;
const additionalWeight = 2.3;
let inchesOver=0;
let weightAllowed = 0;

const utility = {

    calculateBMI(user){

        //logger.info( user.currentWeight );
         return Math.round(user.currentWeight / (user.height * user.height)*100)/100;
        //return typeof  user.currentWeight  ;


    },

    isIdealWeight(user){

        logger.info(`just entered isIdealWeight`);
        //Different Ideal weight for a male or female
        //Base ideal weight off web dev assignment values
        const height = this.heightInFeet(user.height);
        logger.info(`height is ${height}`);
        let ideal = false;
        //male members
        if(user.gender === "male"){

            if(height <= 5){
                if(user.currentWeight <= 52 & user.currentWeight >=48){

                    ideal = true;
                }
                else if (height >5) {

                    inchesOver = height - 5 * 10;
                    weightAllowed = maleBaseWeight + (inchesOver * additionalWeight);
                    logger.info(`weightAllowed is ${weightAllowed}`);
                    if (user.currentWeight <= weightAllowed) {
                        ideal = true;
                    }
                }
                }

        }
        else if (user.gender ==="female"){
            logger.info(`gender is female`);
            if(height <=5){
                logger.info(`height is < 5`);
                if(user.currentWeight <=47.5 & user.currentWeight <=43.5){
                    ideal = true;
                }
            }
                else if (height >5){
                    logger.info(`height is > 5`);
                    inchesOver = (height - 5)*10;
                    weightAllowed = femaleBaseWeight + (inchesOver * additionalWeight);
                    logger.info(`weightAllowed is ${weightAllowed}`);
                    if(user.currentWeight <= (weightAllowed +2) & user.currentWeight >= (weightAllowed -2)){
                        ideal = true;
                    }
                }
            }

        let indicatorCol = "green";
        if(!ideal){
            indicatorCol = "red"
        }
return indicatorCol;
    },

    heightInFeet(height){
        logger.info(`height in feet method`);
        //meters to feet
    return height * 3.2808;
},
    determineBMICategory(user){

        const bmiValue = this.calculateBMI(user);
        let category = "";

        if (bmiValue <16){
            category = "SEVERELY UNDERWEIGHT";
        }
        else  if (bmiValue >=16 & bmiValue <18.5 ){
            category = "UNDERWEIGHT";
        }
        else  if (bmiValue >=18.5 & bmiValue <25 ){
            category = "NORMAL";
        }
        else  if (bmiValue >=25 & bmiValue <30 ){
            category = "OVERWEIGHT";
        }
        else  if (bmiValue >=30 & bmiValue <35 ){
            category = "MODERATELY OBESE";
        }
        else  if (bmiValue >=35 ){
            category = "SEVERELY OBESE";
        }

        return category;

    }
};

module.exports = utility;