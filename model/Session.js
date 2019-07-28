const Sequelize = require('sequelize');
const db = require('../config/db');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const Session = db.define('session', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    // },
    jsession_id: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.STRING
    },
    session_start_time: {
        type: Sequelize.DATE
    },
    session_end_time: {
        type: Sequelize.DATE
    },
    entrance_page_id: {
        type: Sequelize.INTEGER
    },
    exit_page_id: {
        type: Sequelize.INTEGER
    },
    city_id: {
        type: Sequelize.INTEGER
    },
    device_type_id: {
        type: Sequelize.INTEGER
    },
    browser_id: {
        type: Sequelize.INTEGER
    },
    operating_system_id: {
        type: Sequelize.INTEGER
    },
    acquistion_id: {
        type: Sequelize.INTEGER
    },
    is_first_visit: {
        type: Sequelize.INTEGER
    },
    shop_id: {
        type: Sequelize.INTEGER
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Session;