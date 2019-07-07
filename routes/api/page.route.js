const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const axios = require('axios')
const Page = require('../../model/Page')

dotenv.config()

router.post('/', async (req, res) => {
    var url = req.body.page_url
    
    let page = Page.findOne({
        where: {
            page_url: url
        }
    })
    var indexSlash = url.indexOf("/")    
    var domainShop = url.substring(0,indexSlash)

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
router.get('/page_url/:url',async (req,res)=>{
    var url = req.query.url
    page_id = -1
    var page = await Page.findOne({
        where:{
            page_url:url
        }
    })
    if (page!=null){
        res.json(page)
    }
    else {
        res.json({page_id: page_id})
    }
})
module.exports = router