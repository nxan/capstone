const Page = require('../model/Page')
const shop_db = require('../db/shop_db')
const sequelize = require('sequelize');
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

    },
    getPageById: async (id) => {
        var res
        return Page.findOne({
            where: {
                id: id
            }
        }).then((result) => {
            // res = result.dataValues
            // console.log(res)
            return result
        })
    },
    getAllPage: async (shop_id) => {
        console.log(shop_id)
        return Page.findAll({
            where: {
                shop_id: shop_id
            }
        }).then((result) => {
            return result
        })

    },
    getAllPageWithNotPage: async (shop) => {
        var query = "SELECT id, page_url, shop_id FROM [page] WHERE shop_id = " + shop.id + " and page_url not in ('" + shop.shop_url + "/collections/all','" + shop.shop_url + "/cart')";
        console.log(query);
        var page = await Page.sequelize.query(query, { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            return result
            //res.json(formatSeconds(result[0].Avg))
        });
        return page;
    },

}
