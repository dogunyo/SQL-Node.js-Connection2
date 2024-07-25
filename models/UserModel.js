module.exports = (sequelize, DataTypes)=> {
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        }
    });
    return User;
}