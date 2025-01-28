    const { DataTypes } = require('sequelize');
    const sequelize = require('../db');

    const Videos = sequelize.define("Videos", {
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
          
        },
        videoFeedback:{
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

    module.exports = Videos;
