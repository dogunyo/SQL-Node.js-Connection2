const db = require('../models/indexStart')
const createError = require('http-errors')

//use the model
const Student = db.students;
const Course = db.courses;



module.exports = {

    //Add a single student to the database
    AddStudent: async(req, res, next)=>{
        try {
            let info = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender
            }

            const addStudent = await Student.create(info)
            res.status(201).send({message: "Student added successfully"});
        } catch (error) {
            next(error)
        }
    },

    //get student by the id
    GetStudent: async(req, res, next)=>{
        try {
            let id = req.params.id
            let student = await Student.findOne({where: {student_id: id}})

            if (!student) {
                throw(createError(401, "Student doesn't exist"))
            }
            res.status(201).send(student)
        } catch (error) {
            next(error)
        }
    },

    //Get a list of all the students
    AllStudents: async(req, res, next)=>{
        try {
            const students = await Student.findAll({
                include: [{model: Course, attributes:['courseName']}]
            });
            res.status(201).send(students)
        } catch (error) {
            console.log(error.message)
            next(error);
        }
    },

    //Update the student by the id
    UpdateStudent: async(req, res, next)=>{
        const id = req.params.id;
        try {
            const update = req.body;
            const result = await Student.update(update, {where: { student_id: id }});            
            if (!result) {
                throw(createError(401, "Student doesn't exist"));
            }
            res.status(201).send({message: "Student updated successfully"});
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },

    //Delete the student
    DeleteStudent: async(req, res, next)=> {
        const id = req.params.id;
        try {
            const result = await Student.destroy({where: { student_id: id }});
            if (!result) {
                throw(createError(401, "Student doesn't exist"));
            }
            res.status(201).send({message: "Student deleted successfully"});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
};