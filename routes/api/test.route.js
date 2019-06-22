const express = require('express')
const router = express.Router()
const pageDB = require('../../db/pageDB')
const Page = require('../../model/Page')
router.get('/', async (req, res) => {
   var page_url = 'freestylefootballasd.myshopify.com/products/18k-intertwined-earrings'
   var shop_id = 5
   // var result = await pageDB.addPage(url,shop_id)
   var page = await Page.findOne({
      where: {
         page_url: page_url
      }
   })
   if (page == null) {
      var pageFields = {}
      pageFields.page_url = page_url
      pageFields.shop_id = shop_id
      try {
         page = new Page(pageFields)
         await page.save()
      } catch (error) {

      }
      res.json(page)
   }
})
module.exports = router