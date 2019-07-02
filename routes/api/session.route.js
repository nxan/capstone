const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const dotenv = require('dotenv')

dotenv.config();

const Session = require('../../model/Session');
const City = require('../../model/City');
const Device = require('../../model/Device');
const Os = require('../../model/OperatingSystem');
const Browser = require('../../model/Browser');
const axios = require('axios')
const func = require('../../func/check')

const shop_db = require('../../db/shop_db')
const page_db = require('../../db/page_db')
const city_db = require('../../db/city_db')
const session_page_db = require('../../db/session_page_db')
City.hasMany(Session, { foreignKey: 'city_id', sourceKey: 'id' });
Session.belongsTo(City, { foreignKey: 'city_id', targetKey: 'id' });

Device.hasMany(Session, { foreignKey: 'device_type_id', sourceKey: 'id' });
Session.belongsTo(Device, { foreignKey: 'device_type_id', targetKey: 'id' });

Os.hasMany(Session, { foreignKey: 'operating_system_id', sourceKey: 'id' });
Session.belongsTo(Os, { foreignKey: 'operating_system_id', targetKey: 'id' });

Browser.hasMany(Session, { foreignKey: 'browser_id', sourceKey: 'id' });
Session.belongsTo(Browser, { foreignKey: 'browser_id', targetKey: 'id' });

/* -------
 @route GET api/session
 @desc Check visitor live through session
--------*/
router.get('/session_live', (req, res) => {
    
})

/* ----- 
  @route  GET api/session
  @desc   Get all session
-----*/

router.get('/', async (req, res) => {
    try {
        const session = await Session.findAll({
            include: [{
                model: Browser
            },
            {
                model: Device
            },
            {
                model: City
            },
            {
                model: Os
            },
            ],
            attributes: {
                exclude: ['device_type_id', 'city_id', 'operating_system_id', 'browser_id']
            }
        });
        res.json(session)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/session/:session_id
  @desc   Get session by id
-----*/
router.get('/:session_id', async (req, res) => {
    try {
        const session = await Session.findOne({
            where: { id: req.params.session_id }
        });
        res.json(session)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/session
  @desc   Create session
-----*/

router.post('/', [
    // check('session_start_time', 'Thời gian bắt đầu session is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, session_end_time, url, domain, exit_page_id, device_type_id, operating_system_id, browser_id, acquistion_id, age_id, gender_id, is_first_visit } = req.body;
    jsession = req.session.id
    // cookies = req.cookies
    // if(cookies.user == null){

    // }
    let session = await Session.findOne({
        where: {
            jsession_id: jsession
        }
    })

    if (session == null) {
        let sessionFields = {};

        //Get location by IPIFY api
        let ip = req.headers['x-forwarded-for'];
        let api_Key = process.env.IPIFY_API_KEY;
        let location
        await axios.get(`https://geo.ipify.org/api/v1?apiKey=${api_Key}&ipAddress=${ip}`)
            .then((response) => {
                location = response.data.location
            })
        //Get done

        //Save location and get id to save to session
        city_db.addCity(location)
        let city = await city_db.getCity(location)
        sessionFields.city_id = city.id
        //Save done

        //get entrance page
        let productUrl = domain + url
        let shop_infor = await shop_db.getShop(domain)
        let shop_id = shop_infor.id
        await page_db.addPage(productUrl, shop_id)
        entrance_page = await page_db.getPage(productUrl)
        sessionFields.entrance_page_id = entrance_page.id
        //get done
        sessionFields.jsession_id = req.session.id;
        if (user_id) sessionFields.user_id = user_id;
        //date
        date = new Date(Date.now()).toISOString()
        console.log(date)
        sessionFields.session_start_time = date
        //
        if (session_end_time) sessionFields.session_end_time = session_end_time;
        // if (entrance_page_id) sessionFields.entrance_page_id = entrance_page_id;
        if (exit_page_id) sessionFields.exit_page_id = exit_page_id;
        // if (city_id) sessionFields.city_id = city_id;
        if (device_type_id) sessionFields.device_type_id = device_type_id;
        if (browser_id) sessionFields.browser_id = browser_id;
        if (operating_system_id) sessionFields.operating_system_id = operating_system_id;
        if (acquistion_id) sessionFields.acquistion_id = acquistion_id;
        if (age_id) sessionFields.age_id = age_id;
        if (gender_id) sessionFields.gender_id = gender_id;
        if (is_first_visit) sessionFields.is_first_visit = is_first_visit;

        try {
            session = new Session(sessionFields);
            await session.save();
            let session_page_infor = {
                session_id: session.id,
                page_id: entrance_page.id
            }
            session_page_db.add_session_page(session_page_infor)
            res.status(200).send({ stt: 'Session saved' });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }

    else {
        let productUrl = domain + url
        let page = await page_db.getPage(productUrl)
        let session_page_infor = {
            session_id: session.id,
            page_id: page.id
        }
        session_page_db.add_session_page(session_page_infor)
        res.status(200).send('Done')
    }
});

/* ----- 
  @route  PUT api/session
  @desc   Update session
-----*/

router.put('/', [
    check('session_start_time', 'Thời gian bắt đầu session is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, jsession_id, user_id, session_start_time, session_end_time, entrance_page_id, exit_page_id, city_id, device_type_id, os_id, is_first_visit } = req.body;
    var sessionFields = {};
    if (id) sessionFields.id = id;
    if (jsession_id) sessionFields.jsession_id = jsession_id;
    if (user_id) sessionFields.user_id = user_id;
    if (session_start_time) sessionFields.session_start_time = session_start_time;
    if (session_end_time) sessionFields.session_end_time = session_end_time;
    if (entrance_page_id) sessionFields.entrance_page_id = entrance_page_id;
    if (exit_page_id) sessionFields.exit_page_id = exit_page_id;
    if (city_id) sessionFields.city_id = city_id;
    if (device_type_id) sessionFields.device_type_id = device_type_id;
    if (os_id) sessionFields.os_id = os_id;
    if (is_first_visit) sessionFields.is_first_visit = is_first_visit;

    try {
        let session = await Session.findOne({
            where: { id: sessionFields.id }
        });
        if (session) {
            session.update({
                attributes: ['id', 'exit_page_id'],
                exit_page_id: placeFields.exit_page_id
            });
            return res.json(place);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/session/:id
  @desc   Delete session
-----*/

router.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findOne({
            where: { id: req.params.id }
        });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        await session.destroy();
        res.json({ message: 'session removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;