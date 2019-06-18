const Sequelize = require('sequelize');
const db = require('../config/db');

const Shop = db.define('shop', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    name_shop: {
        type: Sequelize.STRING
    },
    shop_url: {
        type: Sequelize.STRING
    },
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Shop;