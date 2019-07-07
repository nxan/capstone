const Session_page = require('../model/Session_page')
const sequelize = require('sequelize')

module.exports = {
    add_session_page: async (page_infor) => {
        let session_page
        let session_page_field = {}
        let record = await Session_page.max('page_order',{
            where: {
                session_id: page_infor.session_id
            }
        })
        console.log("AL: "+record)
        if (isNaN(record)) {
            session_page_field.page_order = 1
        }
        else {
            session_page_field.page_order = record + 1
        }
        
        session_page_field.page_id = page_infor.page_id
        session_page_field.session_id = page_infor.session_id
        session_page_field.start_time = new Date(Date.now()).toISOString()
        try {
            session_page = new Session_page(session_page_field)
            await session_page.save()
        } catch (error) {
            console.log(error)
        }
        return session_page
    }
}