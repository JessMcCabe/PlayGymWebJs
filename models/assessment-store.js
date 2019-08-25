'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const assessmentStore ={



  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getUserAssessmets(userId){
    return this.store.findBy(this.collection,{userId:userId});
  },
  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },

  removeAllAssessment() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  addAssessmentComment(assessmentid,comment){

    const assessment = this.getAssessment(assessmentid);
    assessment.comment = comment;
    //assessment.comment.push(comment);
    this.store.save();

  }
};


module.exports = assessmentStore;