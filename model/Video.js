const Sequelize = require('sequelize');
const db = require('../config/db');


const Video = db.define('video', {
    session_id: {
        type: Sequelize.INTEGER
    },
    session_page_id: {
        type: Sequelize.INTEGER
    },
    folder_url: {
        type: Sequelize.STRING
    },
    parent_id: {
        type: Sequelize.INTEGER
    },
    is_parent: {
        type: Sequelize.BOOLEAN
    },
    next_page: {
        type: Sequelize.INTEGER
    },
    url: {
        type: Sequelize.STRING
    },
    is_next_page:{
        type: Sequelize.BOOLEAN
    },
    is_redirect:{
        type: Sequelize.BOOLEAN
    },
    is_image:{
        type: Sequelize.BOOLEAN
    }
}
,
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Video;