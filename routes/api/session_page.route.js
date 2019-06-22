const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const axios = require('axios')
const Session_page = require('../../model/Session_page')
dotenv.config()

router.post('/',(req,res)=>{
    var session_id = req.body.session_id
    var page_id = req.body.page_id
    var record = Session_page.findOne({
        where:{
            session_id: session_id
        },
        order:[
            sequelize.fn('max', sequelize.col('page_order')),
        ]
    })
    if(record!=null){
        session_page_field.page_order = ++record.page_order        
    }
    else {
        session_page_field.page_order = 1
    }
    var session_page_field = {}
        session_page_field.page_id = page_id
        session_page_field.session_id = session_id        
    try {
        var session_page = Session_page.save(session_page_field)
        res.json(session_page)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
