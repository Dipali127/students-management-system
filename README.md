# students-management-system
#Documentation
Here, I have created three model, they are student,teacher and assignment.
At first, student register and login himself.
Then teacher will register and login himself and after that create assignment for the student by providing student's objectId as well as his/her(teacher's) objectId.

//how to run the project//
for running the project, first move inside the src folder where the primary entry point of the 
project is present ,for this we use command cd src from the "student-management-system" folder

Now,run "nodemon index.js" for running the server as well as connect to the mongodb database.

Now, run the particular api's of the student, teacher and assignment from the postman for testing 
these api's.

Note:-> post api of student will be run through sending the data from "form-data".

Also,i have used validation for name,email,password,mobile, objectid, invalid input.
