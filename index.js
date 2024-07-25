require('dotenv').config();
const express = require('express');
const studentRoutes = require('./routes/StudentRoutes');
const courseRoutes = require('./routes/CourseRoutes');
const authRoutes = require('./routes/AuthRoutes');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
require('./models/indexStart')
    const app = express()

    var corOptions = {
        credentials: true,
        origin: 'http://localhost:3000'
    }

    //middlewares to parse json
    app.use(cors(corOptions))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    //Student Routes
    app.use('/api/Student/', studentRoutes);

    //Course Routes
    app.use('/api/Course/', courseRoutes);

    //Auth Routes
    app.use('/api/auth/', authRoutes);
    
    //handling 401 errors
    app.use((req, res, next)=>{
        const err = new Error('Not Found!');
        err.status = 401;
        next(err);
    });

    //Error handling
    app.use((err, req, res, next)=>{
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            },
        });
    });

    const PORT = process.env.APP_PORT || 5000

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`) 
        console.log('DB config:', dbConfig);
    })