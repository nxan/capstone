const express = require('express');
const router = express.Router();
const axios = require('axios');

const Country = require('../../model/Country');
const City = require('../../model/City');

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
    var result = req.body
    try {
        var city = await City.findOne({
            where: {
                city_name: result.location.city
            }
        });
        if (city == null) {
            var cityFields = {}
            cityFields.city_name = result.location.city
            cityFields.postal_code = result.location.postalCode
            await axios.post(process.env.DOMAIN + '/api/country', result)
                .then(function (response) {
                    cityFields.country_id = response.data.id
                })
                .catch(function (error) {
                    console.log(error);
                });
            try {
                city = new City(cityFields);
                await city.save();
                res.json(city);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }
        }
        else {
            res.json(city);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;