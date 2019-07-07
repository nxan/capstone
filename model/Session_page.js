const Sequelize = require('sequelize');
const db = require('../config/db');

const Session_page = db.define('session_page', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_id: {
        type: Sequelize.INTEGER
    },
    page_id: {
        type: Sequelize.INTEGER
    },
    page_order: {
        type: Sequelize.INTEGER
    },
    start_time: {
        type: Sequelize.DATE
    },
    end_time: {
        type: Sequelize.DATE
    }
},
    {
        timestamps: false,
        freezeTableName: true
    })
module.exports = Session_page