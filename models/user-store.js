'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const userStore = {

  store: new JsonStore('./models/user-store.json', {users: []}),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, {id: id});
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, {email: email});
  },

  getTrainersMembers(trainerid) {
    return this.store.findBy(this.collection, {trainerid: trainerid});
  },

  deleteUser(id) {
    const userToDelete = this.getUserById(id);
    this.store.remove(this.collection, userToDelete);
    this.store.save();
  },

  updateCurrentWeight(loggedInUser, newAssessment) {
    const user = this.getUserById(loggedInUser.id);
    user.currentWeight = newAssessment.weight;
    this.store.save();

  },
  updateEmailAddress(user, newEmail) {
    const currentUser = this.getUserById(user.id);
    currentUser.email = newEmail;
    //this.store.save();
  },
  updateGender(user, newGender) {
    const currentUser = this.getUserById(user.id);
    currentUser.gender = newGender;
    //this.store.save();
  },
  updatePassword(user, newPassword) {
    const currentUser = this.getUserById(user.id);
    currentUser.password = newPassword;
    //this.store.save();
  },
  updateFirstName(user, newFirstName) {
    const currentUser = this.getUserById(user.id);
    logger.info(`currentuser first name is ${currentUser.firstName}`);
    currentUser.firstName = newFirstName;
    logger.info(`currentuser first name is now updated to ${currentUser.firstName}`);

  },
  updateLastName(user, newLastName) {
    const currentUser = this.getUserById(user.id);
    logger.info(`currentuser last name is ${currentUser.lastName}`);
    currentUser.lastName = newLastName;
    logger.info(`currentuser last name is ${currentUser.lastName}`);
  //  this.store.save();
  },
  updateMemberDetails(user, request) {
    //call above methods then save here
    const currentUser = this.getUserById(user.id);
    //if they passed in a value - update it, if not, don't
    if (request.body.firstName) {
      this.updateFirstName(currentUser, request.body.firstName);
      logger.info( request.body.firstName );
      this.store.save();
    }

    if (request.body.lastName) {
      this.updateLastName(currentUser, request.body.lastName);
      this.store.save();
    }

    if (request.body.email != currentUser.email) {
      this.updateEmailAddress(currentUser, request.body.email);
      this.store.save();
    }

    if (request.body.password != currentUser.password) {
      this.updatePassword(currentUser, request.body.password);
      this.store.save();
    }

    if (request.body.gender) {
      this.updateGender(currentUser, request.body.gender);
      this.store.save();
    }

    this.store.save();
  }



};

module.exports = userStore;