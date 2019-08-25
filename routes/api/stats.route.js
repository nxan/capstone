const express = require('express')
const router = express.Router()
const sequelize = require('sequelize');
const dateFormat = require('dateformat');
const SessionPage = require('../../model/Session_page');
const Session = require('../../model/Session');
const db = require('../../config/db');
const shop_db = require('../../db/shop_db')
const country_db = require('../../db/country_db')
const session_db = require('../../db/session_db')
const session_page_db = require('../../db/session_page_db')
const groupArray = require('group-array')
function formatSeconds(seconds) {
    const date = new Date(1970, 0, 1);
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
  @route  Count api/stats/count/session/lastweek/:shop_url
  @desc   Count sessions lastweek shop
-----*/
router.get('/count/session/lastweek/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_sessions_lastweek = []
    for (var i = 1; i < 8; i++) {
        var sql = 'select * from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) = ' + i + 'AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_sessions_lastweek.unshift(result.length)
        })
    }
    res.json(array_sessions_lastweek)
});

router.get('/count/session/lastmonth/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_sessions_lastmonth = []
    for (var i = 1; i < 30; i++) {
        var sql = 'select * from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) = ' + i + 'AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_sessions_lastmonth.unshift(result.length)
        })
    }
    res.json(array_sessions_lastmonth)
});

router.get('/count/session/month/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_sessions_month = []
    for (var i = 1; i < 31; i++) {
        var sql = 'select * from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) = ' + i + 'AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_sessions_month.unshift(result.length)
        })
    }
    res.json(array_sessions_month)
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

router.get('/count/oldvisitors/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        const count = await Session.count({
            where: { shop_id: shop.id, is_first_visit: false }
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
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
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

/* ----- 
  @route  Count api/stats/count/newvisitor/days/:shop_url/:day
  @desc   Count new visitor last n day
-----*/

router.get('/count/newvisitor/lastweek/:shop_url/', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_lastweek = []
    for (var i = 1; i < 8; i++) {
        var sql = 'select count(user_id) as visitor from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) =' + i + ' AND is_first_visit = 1 AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_visitor_lastweek.unshift(result[0].visitor)
        })
    }
    res.json(array_visitor_lastweek)
});

router.get('/count/newvisitor/lastmonth/:shop_url/', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_lastmonth = []
    for (var i = 1; i < 31; i++) {
        var sql = 'select count(user_id) as visitor from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) =' + i + ' AND is_first_visit = 1 AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_visitor_lastmonth.unshift(result[0].visitor)
        })
    }
    res.json(array_visitor_lastmonth)
});



/* ----- 
  @route  Count api/stats/count/oldvisitor/days/:shop_url/:day
  @desc   Count old visitor last n day
-----*/

router.get('/count/oldvisitor/lastweek/:shop_url/', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_lastweek = []
    for (var i = 1; i < 8; i++) {
        var sql = 'select user_id from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) = ' + i + 'AND shop_id = ' + shop.id + 'group by user_id having count(user_id) > 1';
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_visitor_lastweek.unshift(result.length)
        })
    }
    res.json(array_visitor_lastweek)
});

/* ----- 
  @route  Count api/stats/count/oldvisitor/days/:shop_url/:day
  @desc   Count visitor last n day
-----*/

router.get('/count/visitor/lastweek/:shop_url/', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_lastweek = []
    for (var i = 1; i < 8; i++) {
        var sql = 'select distinct(user_id) from [session] where DATEDIFF(DAY, session_start_time, GETDATE()) = ' + i + 'AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_visitor_lastweek.unshift(result.length)
        })
    }
    res.json(array_visitor_lastweek)
});

router.get('/count/visitor/date/:shop_url/:start_date/:end_date', async (req, res) => {
    const { shop_url, start_date, end_date } = req.params
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_lastweek = []
    let start = new Date(start_date);
    let end = new Date(end_date);
    console.log(`${start} and ${end}`)
    let loop = new Date(start);
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    while (loop <= end) {

        let day = `${loop.getFullYear()}-${months[loop.getMonth()]}-${loop.getDate()}`
        console.log(day)
        let sql = `select distinct(user_id) from [session] where CONVERT(VARCHAR, session_start_time , 120) like '${day}%' ` + 'AND shop_id = ' + shop.id;
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            array_visitor_lastweek.unshift(result.length)
        })
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    res.json(array_visitor_lastweek)
});
/* ----- 
  @route  Count api/stats/count/visitor/day/:shop_url
  @desc   Count visitor last n day
-----*/

router.get('/count/visitor/day/:shop_url/:from/:to', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_bydate = []
    var sql = "select distinct(user_id) from [session] where session_start_time between " + req.params.from + ' and ' + req.params.to + "AND shop_id = " + shop.id;
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        array_visitor_bydate.unshift(result.length)
    })
    res.json(array_visitor_bydate)
});

/* ----- 
  @route  Count api/stats/count/newvisitor/days/:shop_url/:day
  @desc   Count new visitor by day
-----*/
router.get('/count/newvisitor/day/:shop_url/:from/:to', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_byday = []
    var sql = "select count(user_id) as visitor from [session] where session_start_time between " + req.params.from + ' and ' + req.params.to + ' AND is_first_visit = 1 AND shop_id = ' + shop.id;
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        array_visitor_byday.unshift(result[0].visitor)
    })
    res.json(array_visitor_byday)
});
/* ----- 
  @route  Count api/stats/count/session/day/:shop_url
  @desc   Count session day y0 day
-----*/
router.get('/count/session/day/:shop_url/:from/:to', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_sessions_day = []
    var sql = "select * from [session] where session_start_time between " + req.params.from + ' and ' + req.params.to + ' AND shop_id = ' + shop.id;
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        array_sessions_day.unshift(result.length)
    })
    res.json(array_sessions_day)
});

/* ----- 
  @route  Count api/stats/count/oldvisitor/days/:shop_url/:day
  @desc   Count old visitor day n day
-----*/

router.get('/count/oldvisitor/day/:shop_url/:from/:to', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_visitor_day = []
    var sql = "select user_id from [session] where session_start_time between " + req.params.from + ' and ' + req.params.to + 'AND shop_id = ' + shop.id + 'group by user_id having count(user_id) > 1';
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        array_visitor_day.unshift(result.length)
    })
    res.json(array_visitor_day)
});

router.get('/user_browser/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        var array_usrbrowser = []
        var sql = 'USE [shopify] SELECT br.id, br.browser_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id = ' + shop.id + ')AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [browser] AS br ON s.browser_id = br.id WHERE s.shop_id = ' + shop.id + ' GROUP BY br.id, br.browser_name'
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrbrowser.unshift(result.pop())
            }
        })
        res.json(array_usrbrowser);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/user_device/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        var array_usrdevice = []
        var sql = 'USE [shopify] SELECT br.id, br.device_type_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id = ' + shop.id + ')AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [device_type] AS br ON s.device_type_id = br.id WHERE s.shop_id = ' + shop.id + ' GROUP BY br.id, br.device_type_name'
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrdevice.unshift(result.pop())
            }
        })
        res.json(array_usrdevice);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/user_OS/:shop_url', async (req, res) => {
    try {
        const shop_url = req.params.shop_url
        let shop = await shop_db.getShop(shop_url)
        var array_usrOS = []
        var sql = 'USE [shopify] SELECT br.id, br.os_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id = ' + shop.id + ')AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [operating_system] AS br ON s.operating_system_id = br.id WHERE s.shop_id = ' + shop.id + ' GROUP BY br.id, br.os_name'
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrOS.unshift(result.pop())
            }
        })
        res.json(array_usrOS);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/test/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var condition = { where: shop_id = shop.id }
    var sessionData = await session_page_db.getSessionPageWithCount(shop.id, 1);
    // var session = sessionData.reduce((acc, o) => (
    //     acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});
    // var result = groupArray(sessionData, 'acquistion_id');
    // var session = sessionData.reduce((acc, o) => (
    //     acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});

    res.json(sessionData.length)
})

router.get('/count/location/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var arraylocation = []
    var country = await country_db.getAllCountry();
    //get Location
    var sql = "SELECT br.id, br.city_name as location, br.country_id, COUNT(s.user_id) users, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) users FROM [session] as s2 WHERE s2.shop_id =" + shop.id + ")AS float),2) AS percentuser FROM [session] AS s LEFT JOIN city AS br ON s.city_id = br.id WHERE s.shop_id = " + shop.id + "  GROUP BY br.id, br.city_name, br.country_id"
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        while (result.length > 0) {
            arraylocation.unshift(result.pop())
        }
    })
    var location = []
    for (var i = 0; i < country.length - 1; i++) {
        var model = {}
        model.location = ''
        model.users = 0
        model.percentuser = '100'
        model.children = []
        for (var j = 0; j <= arraylocation.length - 1; j++) {
            var modelCity = {}
            modelCity.location = ''
            modelCity.users = 0;
            modelCity.percentuser = 0
            if (arraylocation[j].country_id == country[i].id) {
                model.location = country[i].country_name
                modelCity.location = arraylocation[j].location
                modelCity.users = arraylocation[j].users
                modelCity.percentuser = arraylocation[j].percentuser
                model.children.push(modelCity);
                model.users += arraylocation[j].users
            }

        }
        location.push(model);
    }
    // var location = [];
    // var model = {}
    // model.location = 'Viet Nam'
    // model.users = 0
    // model.percentuser = '100'
    // model.children = arraylocation;
    // for (var i = 0; i < arraylocation.length - 1; i++) {
    //     model.users += arraylocation[i].users
    // }
    // location.push(model)
    res.json(location)
})
/* ----- 
  @route  GET /api/aqui/acquisition/:shop_url
  @desc   Get all acquisition
-----*/

router.get('/acquisition/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var condition = { where: shop_id = shop.id }
    var sessionData = await session_db.getAllByCondition(condition);
    // var sessionPageData = await Session_page.sequelize.query('select * from session_page where session_id in (select session_id from session where shop_id =' + shop.id + ')',
    //   { type: sequelize.QueryTypes.SELECT }).then(function (result) {
    //     return result
    //   })
    var sessionPageData = await session_page_db.get_all_session_page(shop.id);
    sessionData.sort();
    var obj = {};

    for (var i = 0, len = sessionData.length; i < len; i++) {
        obj[sessionData[i]['user_id']] = sessionData[i];
    }


    var newSession = []
    for (var key in obj) {
        newSession.push(obj[key]);
    }
    var re_vis = newSession.filter(function (session) {
        return session.is_first_visit == '0'
    })

    // var numBoys = sessionData.reduce(function (n, s) {
    //   return n + (s.acquistion_id || 0) + 1;
    // }, s);
    var result_re_vis = re_vis.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});
    var result_vis = newSession.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});
    var session = sessionData.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});

    var session_page = sessionPageData.reduce((acc, o) => (
        acc[o.session.acquistion_id] = (acc[o.session.acquistion_id] || 0) + 1, acc), {});
    var result = [];

    var avg = await Session.sequelize.query('SELECT avg(DATEDIFF(SECOND, session_start_time, session_end_time)) AS Avg FROM [session] WHERE shop_id = ' + shop.id + ' group by acquistion_id',
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        return result
        //res.json(formatSeconds(result[0].Avg))
    })
    for (var i = 1; i <= 4; i++) {
        var model = {}
        if (i == 1) {
            model.acquistion = 'Social';
        }
        if (i == 2) {
            model.acquistion = 'Search';
        }
        if (i == 3) {
            model.acquistion = 'Direct';
        }
        if (i == 4) {
            model.acquistion = 'Other';
        }
        var bounce_num = await session_page_db.getSessionPageWithCount(shop.id, i);
        model.visitor = result_vis['' + i] == undefined? 0 : result_vis['' + i]
        model.revisitor = result_re_vis['' + i] == undefined ? 0 : result_re_vis['' + i];

        var sessionnum = session['' + i] == undefined ? 1 : session['' + i];
        model.bouncerate = ((bounce_num.length / sessionnum) * 100).toFixed(1) + '%';
        if (session['' + i] == undefined || session_page['' + i] == undefined) {
            model.pagessession = 0;
            model.sessions = 0;
        } else {
            model.sessions = sessionnum;
            model.pagessession = Math.round((session_page['' + i] / sessionnum), 2);
        }
        model.bouncerate = ((bounce_num.length / sessionnum) * 100).toFixed(1) + '%';
        // model.pagessession = session['' + i] + session_page['' + i];
        model.avgsessionduration = avg[i-1] == undefined ? 0 : formatSeconds(avg[i - 1].Avg);
        model.conversionrate = 0;
        model.completion = 0;
        model.value = 0;
        result.push(model)
    }
    res.json(result);
});
router.get('/acquisition/date/:shop_url/:from/:to', async (req, res) => {
    const { shop_url, from, to } = req.params
    let shop = await shop_db.getShop(shop_url)
    const Op = sequelize.Op
    const condition = {
        where: {
            shop_id: shop.id,
            session_start_time: {
                [Op.gte]: from
            },
            session_end_time: {
                [Op.lte]: to
            }

        }
    }
    var sessionData = await session_db.getAllSessionsByDate(shop.id, from, to);
    // var sessionPageData = await Session_page.sequelize.query('select * from session_page where session_id in (select session_id from session where shop_id =' + shop.id + ')',
    //   { type: sequelize.QueryTypes.SELECT }).then(function (result) {
    //     return result
    //   })
    var sessionPageData = await session_page_db.getAllSessionPageFilterDate(shop.id, from, to);
    sessionData.sort();
    var obj = {};

    for (var i = 0, len = sessionData.length; i < len; i++) {
        obj[sessionData[i]['user_id']] = sessionData[i];
    }


    var newSession = []
    for (var key in obj) {
        newSession.push(obj[key]);
    }
    var re_vis = newSession.filter(function (session) {
        return session.is_first_visit == '0'
    })

    // var numBoys = sessionData.reduce(function (n, s) {
    //   return n + (s.acquistion_id || 0) + 1;
    // }, s);
    var result_re_vis = re_vis.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});
    var result_vis = newSession.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});
    var session = sessionData.reduce((acc, o) => (
        acc[o.acquistion_id] = (acc[o.acquistion_id] || 0) + 1, acc), {});

    var session_page = sessionPageData.reduce((acc, o) => (
        acc[o.session.acquistion_id] = (acc[o.session.acquistion_id] || 0) + 1, acc), {});
    var result = [];

    var avg = await Session.sequelize.query("SELECT avg(DATEDIFF(SECOND, session_start_time, session_end_time)) AS Avg FROM [session] WHERE shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND N'" + to + "'" + " group by acquistion_id",
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        return result
        //res.json(formatSeconds(result[0].Avg))
    })
    for (var i = 1; i <= 4; i++) {
        var model = {}
        if (i == 1) {
            model.acquistion = 'Social';
        }
        if (i == 2) {
            model.acquistion = 'Search';
        }
        if (i == 3) {
            model.acquistion = 'Direct';
        }
        if (i == 4) {
            model.acquistion = 'Other';
        }
        var bounce_num = await session_page_db.getSessionPageWithCountFilterDate(shop.id, i, from, to);
        model.visitor = result_vis['' + i] == undefined ? 0 : result_vis['' + i]
        model.revisitor = result_re_vis['' + i] == undefined ? 0 : result_re_vis['' + i];
        model.sessions = session['' + i] == undefined ? 0 : session['' + i];
        var sessionnum = session['' + i] == undefined ? 1 : session['' + i];
        model.bouncerate = ((bounce_num.length / sessionnum) * 100).toFixed(1) + '%';
        if (session['' + i] == undefined || session_page['' + i] == undefined) {
            model.pagessession = 0;
        } else {
            model.pagessession = sessionnum + session_page['' + i];
        }

        model.avgsessionduration = formatSeconds(avg[i - 1] == undefined ? 0 : avg[i - 1].Avg);
        model.conversionrate = 0;
        model.completion = 0;
        model.value = 0;
        result.push(model)
    }
    res.json(result);
});

router.get('/audience/location/:url', async (req, res) => {
    try {
        const url = req.params.url
        let shop = await shop_db.gcount / visitors
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/timeaccess/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url)
    var array_time_access = []
    var sql = `select DATEPART(hh,session_start_time) hours, count(DATEPART(hh,session_start_time)) counter from [session] where shop_id = ${shop.id} GROUP by (DATEPART(hh,session_start_time)) ORDER BY COUNTER desc`;
    await Session.sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT }
    ).then(function (result) {
        result.forEach(element => {
            let from = element.hours
            let end = element.hours + 1
            element.hours = from + "h - " + end + "h"
            array_time_access.push(element)
        });
    })
    res.json(array_time_access)
});

router.get('/audience/bouncrate/:url', async (req, res) => {
    try {
        const url = req.params.url
        let shop = await shop_db.getShop(url)
        var sessionPageData = await session_page_db.get_all_session_page(shop.id);
        var bounce_num = await session_page_db.getSessionPageWithCountNoAcquisition(shop.id);
        var bounceRate = ((bounce_num.length / sessionPageData.length) * 100).toFixed(1) + '%';
        res.json(bounceRate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
})

router.get('/audience/information/:shop_url/:from/:to', async (req, res) => {
    try {
        const url = req.params.shop_url
        let shop = await shop_db.getShop(url)
        const from = req.params.from;
        const to = req.params.to;
        const Op = sequelize.Op
        const condition = {
            where: {
                shop_id: shop.id,
                session_start_time: {
                    [Op.gte]: from
                },
                session_start_time: {
                    [Op.lte]: to
                }

            }
        }
        // var session = await Session.sequelize.query("select * from session where session_start_time >= N'" + from + "' AND session_end_time <= N'" + to + "'",
        //     { type: sequelize.QueryTypes.SELECT }
        // ).then(function (result) {
        //     return formatSeconds(result[0].Avg)
        // })
        var sessionPageData = await session_page_db.getAllSessionPageFilterDate(shop.id, from, to);
        var bounce_num = await session_page_db.getSessionPageWithCountNoAcquisitionFilterDate(shop.id, from, to);
        var bounceRate = ((bounce_num.length / sessionPageData.length) * 100).toFixed(1) + '%';

        const session = await session_db.getAllSessionsByCondition(condition);
        var obj = {};

        for (var i = 0, len = session.length; i < len; i++) {
            obj[session[i]['user_id']] = session[i];
        }
        // getVisitor
        // obj.length;
        var newSession = [], session_array = [], array_usrbrowser = [], array_usrdevice = [], array_usrOS = []
        for (var key in obj) {
            newSession.push(obj[key]);
        }
        var newvisitor = session.filter(function (session) {
            return session.is_first_visit == true
        })

        var avgduration = await Session.sequelize.query("SELECT avg(DATEDIFF(SECOND, session_start_time, session_end_time)) AS Avg FROM [session] WHERE shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND N'" + to + "'",
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            return formatSeconds(result[0].Avg)
        })

        for (var i = 0; i <= session.length - 1; i++) {
            session_array.push(session[i].id)
        }
        const pageview = await SessionPage.count({
            where: {
                session_id: session_array
            }
        })
        const oldvisitor = session.filter(function (session) {
            return session.is_first_visit == false
        })

        // //getUserBrowser
        var sql = "SELECT br.id, br.browser_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id =" + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + ")AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [browser] AS br ON s.browser_id = br.id WHERE s.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + " GROUP BY br.id, br.browser_name"
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrbrowser.unshift(result.pop())
            }
        })
        //get Location
        var arraylocation = []
        var sql = "SELECT br.id, br.city_name as location,br.country_id, COUNT(s.user_id) users, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) users FROM [session] as s2 WHERE s2.shop_id =" + shop.id + "AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + ")AS float),2) AS percentuser FROM [session] AS s LEFT JOIN city AS br ON s.city_id = br.id WHERE s.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + "  GROUP BY br.id, br.city_name, br.country_id"
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                arraylocation.unshift(result.pop())
            }
        })

        //getUserDevice
        var sql = "SELECT br.id, br.device_type_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND N'" + to + "'" + ")AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [device_type] AS br ON s.device_type_id = br.id WHERE s.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + "GROUP BY br.id, br.device_type_name"
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrdevice.unshift(result.pop())
            }
        })
        //getUserOS
        var sql = "SELECT br.id, br.os_name, COUNT(s.user_id) totalCount, ROUND(CAST(COUNT(s.user_id) AS float)*100/CAST((SELECT COUNT(s2.user_id) userTotal FROM [session] as s2 WHERE s2.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "'" + ")AS float),2) AS percentuser FROM [session] AS s LEFT JOIN [operating_system] AS br ON s.operating_system_id = br.id WHERE s.shop_id = " + shop.id + " AND session_start_time BETWEEN N'" + from + "' AND  N'" + to + "' GROUP BY br.id, br.os_name"
        await Session.sequelize.query(sql,
            { type: sequelize.QueryTypes.SELECT }
        ).then(function (result) {
            while (result.length > 0) {
                array_usrOS.unshift(result.pop())
            }
        })
        var array_sessions_lastweek = []
        var theDate = new Date(from);
        var endDate = new Date(to);
        //theDate = dateFormat(theDate, "YYYY-MM-DD")
        var date_length = endDate.getDate() - theDate.getDate();
        for (var i = 1; i <= date_length + 1; i++) {
            var time = theDate.getFullYear() + "-" + (theDate.getMonth() + 1) + "-" + (theDate.getDate());
            var sql = "select count(*) as visitor from session where cast(session_start_time as date) = N'" + time + "' AND shop_id = " + shop.id;
            theDate = new Date(theDate.setDate(theDate.getDate() + 1))
            //theDate = dateFormat(theDate, "YYYY-MM-DD")
            await Session.sequelize.query(sql,
                { type: sequelize.QueryTypes.SELECT }
            ).then(function (result) {
                array_sessions_lastweek.push(result[0].visitor)
            })
            //array_sessions_lastweek.unshift(session.length);
        }

        var country = await country_db.getAllCountry();
        var location = []
        for (var i = 0; i < country.length - 1; i++) {
            var model = {}
            model.location = ''
            model.users = 0
            model.percentuser = '100'
            model.children = []
            for (var j = 0; j <= arraylocation.length - 1; j++) {
                var modelCity = {}
                modelCity.location = ''
                modelCity.users = 0;
                modelCity.percentuser = 0
                if (arraylocation[j].country_id == country[i].id) {
                    model.location = country[i].country_name
                    modelCity.location = arraylocation[j].location
                    modelCity.users = arraylocation[j].users
                    modelCity.percentuser = arraylocation[j].percentuser
                    model.children.push(modelCity);
                    model.users += arraylocation[j].users
                }

            }
            location.push(model);
        }
        var result = {
            avgDuration: avgduration,
            newuser: newvisitor.length,
            olduser: oldvisitor.length,
            pageView: pageview,
            session: session.length,
            usrOs: array_usrOS,
            usrbrowser: array_usrbrowser,
            usrdev: array_usrdevice,
            user: newSession.length,
            bounceRate: bounceRate,
            sessionLastWeek: array_sessions_lastweek,
            location: location
        }
        res.json(result);
    } catch (error) {
        console.log(error)
        res.json(error);
    }
})
module.exports = router;