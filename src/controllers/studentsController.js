const studentModel = require('../models/studentsModel');
const validation = require('../validations/validator');
const aws = require('../AWS/aws-sdk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>registerStudent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const createStudent = async function (req, res) {
    try {
        let studentData = req.body;
        if (!validation.checkInputsPresent(studentData)){
            return res.status(400).send({ stauts: false, message: "Provide student details" });
        }

        console.log(studentData)
        
        let photo = req.file;

        //------------using destructuring fetching data from request body-----------//
        let { firstName, lastName, schoolName, email, mobileNumber, password} = studentData;

        if (!validation.checkString(firstName)) {
            return res.status(400).send({ status: false, msg: "first name is required" });
        }
        if (!validation.validateName(firstName)) {
            return res.status(400).send({ status: false, msg: "first name is invalid " });
        }

        if (!validation.checkString(lastName)) {
            return res.status(400).send({ status: false, msg: "last name is required" });
        }
        if (!validation.validateName(lastName)) {
            return res.status(400).send({ status: false, msg: "last name is invalid " });
        }

        if (!validation.checkString(schoolName)) {
            return res.status(400).send({ status: false, msg: "last name is required" });
        }
        if (!validation.validateName(schoolName)) {
            return res.status(400).send({ status: false, msg: "last name is invalid " });
        }

        if (!validation.checkString(email)) {
            return res.status(400).send({ status: false, msg: "email required to create new student " });
        }
        if (!validation.validateEmail(email)) {
            return res.status(400).send({ status: false, msg: "invalid email provided" });
        }

        let findEmailId = await studentModel.findOne({ email: email });
        if (findEmailId){
            return res.status(409).send({ status: false, message: "provided email is already used" });
        } 

        if (!validation.checkString(mobileNumber)){
            return res.status(400).send({ status: false, msg: "mobileNo. is required to create new student"});
        }
        if (!validation.validateMobileNo(mobileNumber)) {
            return res.status(400).send({ status: false, msg: "invalid mobile no provided" });
        }

        let findMobile = await studentModel.findOne({ mobileNumber: mobileNumber });
        if (findMobile){
            return res.status(409).send({ status: false, message: 'provided mobileNo. is already used' });
        }

        if (!validation.checkString(password)) {
            return res.status(400).send({ status: false, msg: "password required to create new student" });
        }
        if(!validation.ValidPassword(password)) {
            return res.status(400).send({status:false,msg:"Invalid Password"})
        }

        // password encryption
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        if(!validation.checkString(photo)){
            return res.status(400).send({status:false, message:"Student profile image is required"});
        }

        if(!validation.ValidImageType(photo[0].mimetype)){
            return res.status(400).send({status:false, msg:" Only images can be uploaded (jpeg/jpg/png)"})
    
        }

        var uploadedProfilePictureUrl = await aws.uploadFile(photo[0]);

        const studentDetails ={
            firstName:firstName,
            lastName:lastName,
            schoolName:schoolName,
            email:email,
            mobileNumber:mobileNumber,
            password:encryptedPassword,
            photo:uploadedProfilePictureUrl
        }
     //*********************register a new student*************************//
        const registerStudent = await studentModel.create(studentDetails);
        return res.status(201).send({status:true,message:"student registered successfully",Data:registerStudent})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>loginStudent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const loginStudent = async function(req,res){
    try{
        const data = req.body;
        if (!validation.checkInputsPresent(data)) 
        { return res.status(400).send({ status: false, message: "data is required" }); }

        const studentMobileNo = data.mobileNumber;
        const password = data.password;
        
        if (!validation.checkString(studentMobileNo)) 
        { return res.status(400).send({ status: false, message: "mobileNumber is required" }) }
        if (!validation.validateMobileNo(studentMobileNo)) 
        { return res.status(400).send({ status: false, message: "enter a valid mobile Number" }) }

        if (!validation.checkString(password)) 
        { return res.status(400).send({ status: false, message: "Password is required" }) }
        if (!validation.ValidPassword(password)) 
        { return res.status(400).send({ status: false, message: "Password should be in right format" }) }
         
        //finding student by given mobileNumber from studentModel 
        const student = await studentModel.findOne({ studentMobileNo: studentMobileNo});
        if (!student) { return res.status(401).send({ status: false, message: "no student found " }) }

        // comparing hashed password and login password
        const isPasswordMatching = await bcrypt.compare(
            password,
            student.password
        );

        if (!isPasswordMatching)
        {return res.status(400).send({ status: false, msg: "Incorrect password" });}

        //......................creating a jsonWebToken and sending it to response header and body.....................//

        let token = jwt.sign({
            studentId: student._id.toString(),
            iat:Math.floor(Date.now()/1000)
        },
           "studentManagement", { expiresIn: "1min" }
        );

        res.header("Authorization", "Bearer"+ token);
        return res.status(200).send({ status: true, message: "student Login Successfully",studentId:student._id,token:token })

    }catch(error){
        return res.status(500).send({message:error.message});
    }
}

//......................................................................................................//
module.exports ={createStudent};