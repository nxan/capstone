const Page = require('../model/Page')
const shop_db = require('../db/shop_db')

module.exports = {
    addPage: async (page_url, shop_id) => {
        Page.findOrCreate({
            where: { page_url: page_url }, defaults: { page_url: page_url, shop_id: shop_id }
        })
    },
    getPage: async (page_url) => {
        var res
        return Page.findOne({
            where: {
                page_url: page_url
            }
        }).then((result) => {
            // res = result.dataValues
            // console.log(res)
            return result
        })

    }
}