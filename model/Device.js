const Sequelize = require('sequelize');
const db = require('../config/db');

const Device = db.define('device_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },    
    device_type_name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Device;