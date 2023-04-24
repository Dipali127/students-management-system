const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentsController')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Api's for student>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post('/register', studentController.createStudent);

module.exports = router;