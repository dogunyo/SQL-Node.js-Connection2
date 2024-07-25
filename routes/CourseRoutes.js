const courseController = require('../controllers/CourseController');
const express = require('express');
const routes = express.Router();

    //Add course to the database
    routes.post('/addCourse', courseController.AddCourse);

    //Get all courses
    routes.get('/allCourses', courseController.AllCourses);

    //Get course by the id
    routes.get('/getCourse/:id', courseController.GetCourse);

    //update the course
    routes.patch('/updateCourse/:id', courseController.UpdateCourse);

    //delete the course
    routes.delete('/deleteCourse/:id', courseController.DeleteCourse);

module.exports = routes;