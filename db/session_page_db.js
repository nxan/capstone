const Session_page = require('../model/Session_page')
const sequelize = require('sequelize')

module.exports = {
    add_session_page: async (page_infor) => {
        var record = await Session_page.findOne({
            where: {
                session_id: page_infor.session_id
            },
            attributes: [
                sequelize.fn('max', sequelize.col('page_order')),
            ]
        })
        if (record != null) {
            session_page_field.page_order = ++record.page_order
        }
        else {
            session_page_field.page_order = 1
        }
        var session_page
        var session_page_field = {}
        session_page_field.page_id = page_infor.page_id
        session_page_field.session_id = page_infor.session_id
        try {
            session_page = await Session_page.save(session_page_field)
        } catch (error) {
            console.log(error)
        }
        return session_page
    }
}