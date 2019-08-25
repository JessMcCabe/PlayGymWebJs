'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  getTrainersMembers(trainerid){
    return this.store.findBy(this.collection,{trainerid: trainerid});
  },

  deleteUser(id){
    const userToDelete = this.getUserById(id);
    this.store.remove(this.collection,userToDelete);
    this.store.save();
  },

  updateCurrentWeight(loggedInUser,newAssessment){
    const user = this.getUserById(loggedInUser.id);
    user.currentWeight = newAssessment.weight;
    this.store.save();

  }

};

module.exports = userStore;