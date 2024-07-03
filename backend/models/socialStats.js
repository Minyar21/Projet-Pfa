// models/socialStats.js

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  interactions: [{
    date: { type: Date, default: Date.now },
    facebook: { likes: Number, comments: Number, shares: Number },
    instagram: { likes: Number, comments: Number, shares: Number },
    linkedin: { likes: Number, comments: Number, shares: Number },
  }],
});

module.exports = mongoose.model('Client', ClientSchema);
