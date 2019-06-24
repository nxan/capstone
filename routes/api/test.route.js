const express = require('express')
const router = express.Router()
const page_db = require('../../db/page_db')
const shop_db = require('../../db/shop_db')
const Page = require('../../model/Page')
const country_db = require('../../db/country_db')
router.get('/', async (req, res) => {
   location = {
      "country": "VN",
      "region": "Ho Chi Minh",
      "city": "Ho Chi Minh City",
      "lat": 10.8142,
      "lng": 106.6438,
      "postalCode": "",
      "timezone": "+07:00",
      "geonameId": 1566083
  }
   var domain = 'freestylefootballasd.myshopify.com'
   shop = await shop_db.getShop(domain)
   res.json(shop)
})
module.exports = router