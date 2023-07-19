const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const documentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: {type: String },
  children: [childSchema]
});

module.exports = mongoose.model('Projects', documentSchema);
