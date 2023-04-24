const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    schoolName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type: String,
        required: true,
    }

},{ timestamps: true })

module.exports = mongoose.model('student',studentSchema);


//First Name
// Last Name
// School Name
// Email (Unique)
// Mobile (Unique)
// Password (Encrypted in Database)
// Photo of the Students
