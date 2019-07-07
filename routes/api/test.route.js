const express = require('express')
const router = express.Router()
const page_db = require('../../db/page_db')
const shop_db = require('../../db/shop_db')
const Page = require('../../model/Page')
const Session = require('../../model/Session')
const country_db = require('../../db/country_db')
router.get('/', async (req, res) => {
//    location = {
//       "country": "VN",
//       "region": "Ho Chi Minh",
//       "city": "Ho Chi Minh City",
//       "lat": 10.8142,
//       "lng": 106.6438,
//       "postalCode": "",
//       "timezone": "+07:00",
//       "geonameId": 1566083
//   }
//    var domain = 'freestylefootballasd.myshopify.com'
//    shop = await shop_db.getShop(domain)
   session = await Session.findAll({
      attributes: ['entrance_page_id'],
      group:['entrance_page_id']
   })
   let test = session.some(id => id.entrance_page_id === 230)
   res.json(test)
})
module.exports = router