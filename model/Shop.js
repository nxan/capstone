const Sequelize = require('sequelize');
const db = require('../config/db');


const Profile = db.define('shop', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    shop_url: {
        type: Sequelize.STRING
    },
    name_shop: {
        type: Sequelize.STRING
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Profile;