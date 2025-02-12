module.exports = (sequelize, DataTypes)=> {

    const Course = sequelize.define("course",{
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Course;
}