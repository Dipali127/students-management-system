const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const assignmentSchema = new mongoose.Schema({
    title: 
    { type: String,
     required: true },
    description: { type: 
        String },
    dueDate: { type: Date, 
        required: true },
    files: [{
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
      data: { type: Buffer, required: true }
    }],
    students: [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'Group' }]

})