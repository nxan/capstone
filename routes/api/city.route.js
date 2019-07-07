const express = require('express');
const router = express.Router();
const axios = require('axios');

const Country = require('../../model/Country');
const City = require('../../model/City');
const city_db = require('../../db/city_db')

Country.hasMany(City, { foreignKey: 'country_id', sourceKey: 'id' });
City.belongsTo(Country, { foreignKey: 'country_id', targetKey: 'id' });

router.get('/', async (req, res) => {
    try {
        const city = await City.findAll({
            include: [{
                model: Country
            }],
            attributes: {
                exclude: ['country_id']
            }
        });
        res.json(city);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const city = await City.findOne({
            where: {
                id: req.query.id
            }
        });
        res.json(city)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.post('/', async (req, res) => {
    var location = req.body
    try {
        var city = city_db.addCity(location)
        res.json(city)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;