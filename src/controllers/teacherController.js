const teacherModel = require('../models/teacherModel');
const validation = require('../validations/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>create teacher>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const createTeacher = async function (req, res) {
    try {
        let teacherDetails = req.body;
        if (!validation.checkInputsPresent(teacherDetails)) {
            return res.status(400).send({ status: false, message: "teacherDetails is required" });
        }

        let { name, email, password } = teacherDetails;

        if (!validation.checkString(name)) {
            return res.status(400).send({ status: false, message: "name is required" });
        }

        if (!validation.validateName(name)) {
            return res.status(400).send({ status: false, message: "name is invalid" });
        }

        if (!validation.checkString(email)) {
            return res.status(400).send({ status: false, message: "email is required" });
        }

        if (!validation.validateName(email)) {
            return res.status(400).send({ status: false, message: "email is invalid" });
        }

        let findEmail = await teacherModel.findOne({ email: email })

        if (findEmail) {
            return res.status(409).send({ status: false, message: "provided email already present in database" })
        }

        if (!validation.checkString(password)) {
            return res.status(400).send({ status: false, message: "password is required" });
        }

        if (!validation.validateName(password)) {
            return res.status(400).send({ status: false, message: "password is invalid" });
        }

        // password encryption
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        let teacherNewdetails = {
            name: name,
            email: email,
            password: encryptedPassword
        }

        let createTeacherdetails = await teacherModel.create(teacherNewdetails);
        return res.status(201).send({ status: true, message: "teacher details created successfully", Data: createTeacherdetails })

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login teacher>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const loginteacher = async function(req,res){
    try{
        const data = req.body;
        if (!validation.checkInputsPresent(data)) 
        { return res.status(400).send({ status: false, message: "data is required" }); }

        const teacherEmail = data.email;
        const password = data.password;
        
        if (!validation.checkString(teacherEmail)) 
        { return res.status(400).send({ status: false, message: "teacherEmail is required" }) }
        if (!validation.validateEmail(teacherEmail)) 
        { return res.status(400).send({ status: false, message: "Invalid emailId" }) }

        if (!validation.checkString(password)) 
        { return res.status(400).send({ status: false, message: "Password is required" }) }
        if (!validation.ValidPassword(password)) 
        { return res.status(400).send({ status: false, message: "Password should be in right format" }) }
         
        //finding teacher by given emailID from teacherModel 
        const teacher = await studentModel.findOne({ teacherEmail: teacherEmail});
        if (!teacher) { return res.status(401).send({ status: false, message: "no teacher found " }) }

        // comparing hashed password and login password
        const isPasswordMatching = await bcrypt.compare(
            password,
            teacher.password
        );

        if (!isPasswordMatching)
        {return res.status(400).send({ status: false, msg: "Incorrect password" });}

        //......................creating a jsonWebToken and sending it to response header and body.....................//

        let token = jwt.sign({
            teacherId: teacher._id.toString(),
            iat:Math.floor(Date.now()/1000)
        },
           "studentManagement", { expiresIn: "1min" }
        );

        res.header("Authorization", "Bearer"+ token);
        return res.status(200).send({ status: true, message: "teacher Login Successfully",studentId:student._id,token:token })

    }catch(error){
        return res.status(500).send({message:error.message});
    }
}

module.exports = {createTeacher,loginteacher}