const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define("PictureFeedback", {
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
    pictures: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
       
    },
    commentOne:{
        type:DataTypes.STRING,
        allowNull:false

    },
    commentTwo:{
        type:DataTypes.STRING,
        allowNull:false

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
