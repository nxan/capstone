const express = require('express');
const router = express.Router();
const City = require('../../model/City');
const axios = require('axios');
router.get('/', async (req, res) => {
    try {
        const city = await City.findAll();                
        res.json(city)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const city = await City.findOne({
            where:{
                id:req.query.id
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
            where:{
                city_name:result.location.city
            }
        });
        if(city == null){
            var cityFields = {}
            cityFields.city_name = result.location.city
            cityFields.postal_code = result.location.postalCode  
            await axios.post('http://localhost:3000/api/country', result)
              .then(function (response) {                
                cityFields.country_id = response.data.id
              })
              .catch(function (error) {
                // console.log(error);
              });
            //   console.log(country_id)
            try {
                city = new City(cityFields);
                await city.save();
                res.json(city);
            } catch (err) {
                // console.log(err.message);
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