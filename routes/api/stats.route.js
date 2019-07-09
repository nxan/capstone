const express = require('express')
const router = express.Router()
const sequelize = require('sequelize');

const SessionPage = require('../../model/Session_page');
const Session = require('../../model/Session');

const shop_db = require('../../db/shop_db')


function formatSeconds(seconds) {
    const date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

/* ----- 
  @route  Count api/stats/count/:shop_url
  @desc   Count session 1 shop
-----*/

router.get('/count/session/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/visitors/:shop_url
  @desc   Count visitors 1 shop
-----*/

router.get('/count/visitors/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            col: 'user_id',
            distinct: true,
            where: { shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/newvisitors/:shop_url
  @desc   Count visitors 1 shop
-----*/

router.get('/count/newvisitors/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { shop_id: shop.id, is_first_visit: true }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/avgduration/:shop_url
  @desc   Count avgduration 1 shop
-----*/

router.get('/count/avgduration/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    await Session.sequelize.query('SELECT avg(DATEDIFF(SECOND, session_start_time, session_end_time)) AS Avg FROM [session] WHERE shop_id = ' + shop.id,
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(result) {
        res.json(formatSeconds(result[0].Avg))
    })
});

/* ----- 
  @route  Count api/stats/count/visitors/:shop_url
  @desc   Count visitors 1 shop
-----*/

router.get('/count/pageview/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const session = await Session.findAll({
            where: {
                shop_id: shop.id
            }
        })
        var session_array = []
        var session_json = JSON.parse(JSON.stringify(session))
        for (var i in session_json) {
            session_array.push(session_json[i].id)
        }
        const pageview = await SessionPage.count({
            where: {
                session_id: session_array
            }
        })
        res.json(pageview)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/acquistion/social/:shop_url
  @desc   Count acquistion social 1 shop
-----*/

router.get('/count/acquistion/social/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { acquistion_id: 1, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/acquistion/search/:shop_url
  @desc   Count acquistion search 1 shop
-----*/

router.get('/count/acquistion/search/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { acquistion_id: 2, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/acquistion/direct/:shop_url
  @desc   Count acquistion direct 1 shop
-----*/

router.get('/count/acquistion/direct/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { acquistion_id: 3, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/acquistion/other/:shop_url
  @desc   Count acquistion other 1 shop
-----*/

router.get('/count/acquistion/other/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { acquistion_id: 4, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/device/desktop/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/desktop/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 1, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


/* ----- 
  @route  Count api/stats/count/device/desktop/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/desktop/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 1, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/device/desktop/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/desktop/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 1, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/device/mobile/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/mobile/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 2, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/device/tablet/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/tablet/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 3, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  Count api/stats/count/device/other/:shop_url
  @desc   Count device desktop 1 shop
-----*/

router.get('/count/device/other/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { device_type_id: 4, shop_id: shop.id }
        })
        res.json(count)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;