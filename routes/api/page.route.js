const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const axios = require('axios')
const Page = require('../../model/Page')

dotenv.config()

router.post('/', async (req, res) => {
    var url = req.body.page_url

    //Remove https and get domain shop
    var indexHttps = str.indexOf("//")
    var urlRemovedHttp = str.substring(indexHttps + 2, str.length);
    var indexLink = urlRemovedHttp.indexOf("/")
    var domainShop = urlRemovedHttp.substring(0, indexLink);

    let page = Page.findOne({
        where: {
            page_url: urlRemovedHttp
        }
    })


    var shop_id
    if (page == null) {
        await axios.get(process.env.DOMAIN + "/api/shop/url/"+domainShop)
        .then((response)=>{
            shop_id = response.data.shop_id
        })
        var page_field = {}
        page_field.page_url = urlRemovedHttp
        page_field.shop_id = shop_id
        try {
            page = new Page(page_field)
            await page.save()
            res.json(page)
        } catch (error) {
            console.log()
        }
    }

})
module.exports = router