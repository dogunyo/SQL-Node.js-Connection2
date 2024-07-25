const { authSchema } = require("../helpers/validation")
// const User = require('../models/UserModel');
const db = require('../models/indexStart');
const User = db.users;
const createError = require('http-errors')
const signAccessToken = require('../helpers/Jwt')

module.exports = {

    //register controller
    Register: async(req, res, next)=> {
        try {
            //validate the request body
            const result = await authSchema.validateAsync(req.body);
    
            //check if the user exist
            const existingUser = await User.findOne({where: {email: result.email}});
            if (existingUser) {
                throw createError.Conflict(`${result.email} is already registered`);
            };
            //create a new user instance 
            const user = User.build(result);
            //save the user to the database
            const savedUser = await user.save();
            //assign the accessToken
            const accessToken = await signAccessToken(savedUser.id)

            res.status(201).send(accessToken);
        } catch (error) {
            if (error.isJoi === true) {
                error.status = 422;//validation error
            }
            next(error)//pass error to the error handling middleware
        }
    },

    //Login controller
    Login: async(req, res, next)=> {
        try {
            //validate the request body
            const result = await authSchema.validateAsync(req.body);
            //check if the user exist
            const user = await User.findOne({email: result.email});
            if (!user) {
                throw createError.NotFound('User is not registered');
            }
            //matching password
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) {
                throw createError.Unauthorized('Email/password not valid')
            }
            const accessToken = await signAccessToken()
            res.status(201).send({message: "login successful"});
        } catch (error) {
            if(error.isJoi=== true)
                return next (createError.BadRequest('Invalid username/password'))
             console.log(error)
        }
    }

};