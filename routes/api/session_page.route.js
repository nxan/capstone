const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const axios = require('axios')
const Session_page = require('../../model/Session_page')
const sequelize = require('sequelize')

const session_page_db = require('../../db/session_page_db')
const page_db = require('../../db/page_db')
dotenv.config()

router.post('/',async (req,res)=>{
    console.log("start")
    var session_id = req.session.id
    console.log("id: " + session_id)
    var page_id = await page_db.getPage(req.body.url).id
    console.log("page: " + page_id)
    // session_page_infor = {
    //     session_id,
    //     page_id
    // }
    // var result = await session_page_db.add_session_page(session_page_infor)
    res.sendStatus(200)
})

module.exports = router
