// index.js (or wherever you configure and sync the database)
const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('database connection successful...');
    })
    .catch(err => {
        console.log('Error: ' + err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require('./StudentModel.js')(sequelize, DataTypes);
db.courses = require('./CourseModel.js')(sequelize, DataTypes);
db.users = require('./UserModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    });

// Database associations
// One to one relationship
db.students.belongsTo(db.courses, { foreignKey: "course_id" });

// One to many
db.courses.hasMany(db.students, { foreignKey: "course_id" });

module.exports = db;
