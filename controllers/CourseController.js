const db = require('../models/indexStart');
const createError = require('http-errors');

//use the course model
const Course = db.courses;

module.exports = {

    //Add course to the database
    AddCourse: async(req, res, next)=> {
        try {
            let info =  {
                courseName: req.body.courseName,
                courseDescription: req.body.courseDescription
            }

            const addCourse = await Course.create(info)
            res.status(201).send({message: "Course added successfully"});
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },

    //Get a course by the id
    GetCourse: async(req, res, next)=> {
        try {
            let id = req.params.id
            let course = await Course.findOne({where: {course_id: id}})

            if (!course) {
                throw(createError(401, "The course doesn't exist"))
            }
            res.status(200).send(course);
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },

    //Get a list of all the courses
    AllCourses: async(req, res, next)=> {
        try {
            const courses = await Course.findAll();
            res.send(courses)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },

    //Update the course
    UpdateCourse: async(req, res, next)=> {
        const id = req.params.id;
        try {
            const update = req.body;
            const result = await Course.update(update,{where: {course_id: id}})
            if (!result) {
                throw(createError(401, "The course doesn't exist"))
            }
            res.status(201).send({message: "Course updated successfully"});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    //Delete course from the database
    DeleteCourse: async(req, res, next)=>{
        const id =req.params.id;
        try {
            const result = await Course.destroy({where: {course_id: id}});
            if (!result) {
                throw(createError(401, "The course doesn't exist"))
            }
            res.status(201).send({message: "Course deleted successfully"});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

};