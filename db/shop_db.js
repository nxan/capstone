const Shop = require('../model/Shop')
module.exports = {
    getShop: async (url) => {
        return Shop.findOne({
            where:{
                shop_url: url
            }
        }).then((result)=>{
            return result
        })
        
    }
}