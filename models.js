const Sequelize = require('./db');
const {DataTypes} = require('sequelize');

const User = Sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    chatId: {type: DataTypes.STRING, unique: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    right: {type: DataTypes.INTEGER, defaultValue: 0},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0},
    nickname: {type: DataTypes.STRING,allowNull: true},
});

module.exports = User;