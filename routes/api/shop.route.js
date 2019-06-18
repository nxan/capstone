const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Shop = require('../../model/Shop');
/* ----- 
  @route  GET api/shop
  @desc   Get all shop
-----*/

router.get('/', async (req, res) => {
    try {
        const shop = await Shop.findAll();
        res.json(shop)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/shop
  @desc   Create shop
-----*/

router.post('/', [
    // check('session_start_time', 'Thời gian bắt đầu session is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, name_shop, shop_url } = req.body;
    var shopFields = {};
    if (user_id) shopFields.user_id = user_id;
    if (name_shop) shopFields.name_shop = name_shop;
    if (shop_url) shopFields.shop_url = shop_url;

    try {
        shop = new Shop(shopFields);
        await shop.save();
        res.json(shop);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;                                                                                                                                