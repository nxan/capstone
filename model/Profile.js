const Sequelize = require('sequelize');
const db = require('../config/db');


const Profile = db.define('shop', {
    user_id: {
        type: Sequelize.INTEGER
    },
    shop_url: {
        type: String
    },
    shop_name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Profile;