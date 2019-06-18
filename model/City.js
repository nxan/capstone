const Sequelize = require('sequelize');
const db = require('../config/db');

const City = db.define('city', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city_name: {
        type: Sequelize.STRING
    },
    postal_code: {
        type: Sequelize.STRING
    }, 
    country_id:{
        type: Sequelize.INTEGER
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Device;