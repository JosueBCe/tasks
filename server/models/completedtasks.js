const mongoose = require('mongoose');

const CompletedTaskSchema = mongoose.Schema({
  id: { type: String, required: true },
  completedTasks:{ type: Number }
});

module.exports = mongoose.model('completedTask', CompletedTaskSchema);
