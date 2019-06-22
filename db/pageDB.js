const Page = require('../model/Page')
module.exports = {
    addPage: (page_url, shop_id) => {
        console.log('URL: ' + page_url)
        const create = { page_url, shop_id }
        return Page.findOrCreate({
            where: { page_url }, defaults: create
        })
    },    
}