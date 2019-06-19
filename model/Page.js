const Sequelize = require('sequelize');
const db = require('../config/db');

const Page = db.define('page', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    page_url: {
        type: Sequelize.STRING
    },
    shop_id: {
        type: Sequelize.INTEGER
    },
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Page;