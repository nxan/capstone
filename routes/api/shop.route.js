const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator/check');


const Shop = require('../../model/Shop');
const User = require('../../model/User');


/* ----- 
  @route  GET api/Shop
  @desc   Get logged in Shop
-----*/
Shop.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id' });

router.get('/me', auth, async (req, res) => {
    try {
        const shop = await Shop.findOne({
            include: [{
                model: User,
                where: { id: req.user.id }
            }]
        });
        if (!shop) {
            return res.status(400).json({ message: 'There is no Shop for this user' });
        }
        res.status(200).json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  POST api/shop
  @desc   Create or update user shop
-----*/

router.post('/', [auth, [
    check('shop_url', 'Shop URL is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { shop_url, shop_name } = req.body;

    //Build Shop object
    var shopFields = {};
    shopFields.user_id = req.user.id;
    if (shop_url) shopFields.shop_url = shop_url;
    if (shop_name) shopFields.shop_name = shop_name;
    try {
        var shop = await Shop.findOne({
            include: [{
                model: User,
                where: { id: req.user.id }
            }]
        });
        if (shop) {
            Shop.update({
                attributes: ['id', 'shop_url', 'shop_name'],
                shop_url: shopFields.shop_url,
                shop_name: shopFields.shop_name
            });
            return res.json(shop);
        } else {
            shop = new Shop(shopFields);
            await Shop.save();
            res.json(shop);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

/* ----- 
  @route  GET api/Shop
  @desc   Get all Shop
-----*/
router.get('/', async (req, res) => {
    try {
        const shops = await Shop.findAll({
            include: [{
                model: User
            }]
        });
        res.json(shops)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/Shop//user/:user_id
  @desc   Get user Shop
-----*/
router.get('/user/:user_id', async (req, res) => {
    try {
        const shop = await Shop.findOne({
            include: [{
                model: User,
                where: { id: req.params.user_id }
            }]
        });
        if (!shop) {
            return res.status(400).json({ message: 'Shop not found' });
        }
        res.json(shop)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/shop/url/:url
  @desc   Get shop by url
-----*/
router.get('/url/:url', async (req, res) => {
    var url = req.param('url')
    var shop_id = -1
    var shop = await Shop.findOne({
        where: {
            shop_url: url
        }
    })
    if (shop != null) {
        res.json(shop)
    }
    else {
        res.json({ shop_id: shop_id })
    }


})
module.exports = router;