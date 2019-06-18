const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = User;