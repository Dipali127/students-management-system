const assignmentModel = require('../models/assignmentModel');
const validation = require('../validations/validator.js');


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Assignment created by teacher>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//



const createAssignment = async function (req, res) {
    try {
        let assignmentDetails = req.body;
        if (!validation.checkInputsPresent(assignmentDetails)) {
            return res.status(400).send({ stauts: false, message: "Provide assignment details" });
        }
        const { title, description, file, target,teacherId,studentId} = assignmentDetails;
    

        if (!validation.checkString(title)) {
            return res.status(400).send({ status: false, message: "title is required" });
        }

        if (!validation.validateName(title)) {
            return res.status(400).send({ status: false, message: "title is invalid" });
        }

        if (!validation.checkString(description)) {
            return res.status(400).send({ status: false, message: "description is required" });
        }

        if (!validation.validateName(description)) {
            return res.status(400).send({ status: false, message: "description is invalid" });
        }

        if (!validation.checkString(file)) {
            return res.status(400).send({ status: false, message: "file is required" });
        }

        if (!validation.validateName(file)) {
            return res.status(400).send({ status: false, message: "file is invalid" });
        }

        if (!validation.checkString(teacherId)) {
            return res.status(400).send({ status: false, message: "teacherId is required" });
        }

        if (!validation.validateId(teacherId)) {
            return res.status(400).send({ status: false, message: "teacherId have invalid id" });
        }

        if (!validation.checkString(studentId)) {
            return res.status(400).send({ status: false, message: "studentId is required" });
        }

        if (!validation.validateId(studentId)) {
            return res.status(400).send({ status: false, message: "studentId have invalid id" });
        }

        const assignment = await assignmentModel.save({ title, description, file, target, teacherId, studentId});
        return res.status(201).send({ status: true, message: "assignment successfully created", Data: assignment });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {createAssignment}