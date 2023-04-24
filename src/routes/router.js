const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentsController');
const assignmentController = require('../controllers/assignmentController')
const teacherController = require('../controllers/teacherController')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Api's for student>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post('/studentRegister', studentController.createStudent);
router.post('/loginStudent',studentController.loginStudent)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Api's for assignment>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
router.post('/assignments',assignmentController.createAssignment);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Api's for teacher>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
router.post('/teacherRegister',teacherController.createTeacher);
router.post('/loginTeacher',teacherController.loginteacher) 

module.exports = router;