const studentController = require('../controllers/StudentController');
const express = require('express');
const routes = express.Router();

    //Add a student to the database.
    routes.post('/addStudent', studentController.AddStudent);

    //get a list if all the students
    routes.get('/allStudents', studentController.AllStudents);

    //get a student by the id
    routes.get('/getStudent/:id', studentController.GetStudent);

    //Update the student
    routes.patch('/updateStudent/:id', studentController.UpdateStudent);

    //Delete the student
    routes.delete('/deleteStudent/:id', studentController.DeleteStudent);

module.exports = routes;