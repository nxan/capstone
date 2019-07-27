const Sequelize = require('sequelize');
const db = require('../config/db');


const Video = db.define('video', {
    session_id: {
        type: Sequelize.INTEGER
    },
    url_video: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Video;