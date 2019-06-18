const Sequelize = require('sequelize');
const db = require('../config/db');

const Browser = db.define('browser', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },    
    browser_name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Browser;