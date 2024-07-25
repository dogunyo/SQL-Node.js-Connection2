const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/UserModel');

    module.exports = {
        //middleware to create access token
        signAccessToken:(user_id)=>{
            return new Promise((resolve, reject)=>{
                const payload = {}
                const secret = process.env.ACCESS_TOKEN_SECRET;
                const Option = {
                    expiresIn: '10m',
                    issuer:'',
                    audience: user_id,
                }
                JWT.sign(payload, secret, Option,(error, token)=>{
                    if(error) {
                        console.log(error.message)
                        reject(createError.InternalServerError());
                    }
                    resolve(token);
                })
            })
        },


        //middleware to verify access token
        verifyAccessToken: (req, res, next) => {
            // Check if the authorization header exist
            if (!req.headers['authorization']) return next(createError.Unauthorized());
        
            // get the token from the authorization header
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' '); // Split on space to separate 'Bearer' and the token
            const token = bearerToken[1]; // Get the token part
        
            // Verify the token
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    return next(createError.Unauthorized());
                }
                req.payload = payload;
                next();
            });
        },
        


    };