//********************************Globally used functions*********************************//

const mongoose = require('mongoose');

// checking that there is something as input
const checkInputsPresent = (value) => { return (Object.keys(value).length > 0); }

// validating that the input must be a non-empty string
const checkString = (value) => { return ((typeof (value) === 'string' && value.trim().length > 0)) };


//***function to validate regex formats > firstName, lastName, email, mobile, photo ****//
const validateName = (name) => { return (/^[a-z]+$/g.test(name)); }

const validateEmail = (email) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)); }

const validateMobileNo = (number) => { return (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(number)); }

const ValidPassword = function (password) { return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))}

const ValidImageType = (image) => {return( /image\/png|image\/jpeg|image\/jpg/.test(image));}

const validateId = (id) => { return mongoose.isValidObjectId(id); }

module.exports ={checkInputsPresent,checkString,validateName,validateEmail,validateMobileNo,ValidPassword,ValidImageType,validateId}
