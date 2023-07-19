const mongoose = require('mongoose');



const TaskSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String },
   imageUrl: { type: String },
   group: [mongoose.Schema.Types.Mixed],
   completed: { type: Boolean }
});

module.exports = mongoose.model('Task', TaskSchema);
