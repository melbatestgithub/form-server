const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define("Comment", {
    satisfaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ambiance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selectedType:{
     type:DataTypes.BOOLEAN,
     defaultValue:false
    },
    video: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    
    
});

module.exports = Comment;
