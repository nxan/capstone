const Sequelize = require('sequelize');
const db = require('../config/db');

const Country = db.define('country', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country_code: {
        type: Sequelize.STRING
    }, 
    country_name: {
        type: Sequelize.STRING
    },   
    
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Device;