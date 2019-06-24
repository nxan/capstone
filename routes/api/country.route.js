const express = require('express');
const router = express.Router();
const country_db = require('../../db/country_db');

router.get('/', async (req, res) => {
    try {
        const country = await Country.findAll();
        res.json(country)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const country = await Country.findOne({
            where: {
                id: req.query.id
            }
        });
        res.json(country)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.post('/', async (req, res) => {
    var location = req.body.location
    console.log(result.location.country)
    try {
        var country = country_db.addCountry(location)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    res.json(country) 
});
module.exports = router;