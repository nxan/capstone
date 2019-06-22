const Shop = require('../model/Shop')
module.exports = {
    getShop: async (url) => {
        var shop = await Shop.findOne({
            where:{
                shop_url: url
            }
        })
        return shop
    }
}