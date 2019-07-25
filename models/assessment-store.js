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

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },

  removeAllAssessment() {
    this.store.removeAll(this.collection);
    this.store.save();
  }

 /* addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
    this.store.save();
  },

  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.store.save();
  },*/
};


module.exports = assessmentStore;