const Sequelize = require('sequelize');
const db = require('../config/db');


const Video = db.define('video', {
    session_id: {
        type: Sequelize.INTEGER
    },
    url_video: {
        type: Sequelize.STRING
    },
    date_time:{
        type: Sequelize.DATE
    }
},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Video;