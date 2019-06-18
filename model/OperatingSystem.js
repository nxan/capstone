const Sequelize = require('sequelize');
const db = require('../config/db');


const Os = db.define('operating_system', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },    
    os_name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Os;