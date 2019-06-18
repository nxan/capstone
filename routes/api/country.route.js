const express = require('express');
const router = express.Router();
const Country = require('../../model/Country');

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
            where:{
                id:req.query.id
            }
        });                
        res.json(country)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.post('/', async (req, res) => {
    var result = req.body
    console.log(result.location.country)
    try {
        var country = await Country.findOne({
            where:{
                country_name:result.location.country
            }
        });
        if(country == null){
            var countryFields = {}
            
            countryFields.country_code = result.location.geonameId
            countryFields.country_name = result.location.country
            try {
                country = new Country(countryFields);
                await country.save();
                res.json(country);
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }
        }
        else {
            res.json(country);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;