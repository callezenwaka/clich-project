'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Items
const ClichSchema = new Schema({
  title: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Clich', ClichSchema);