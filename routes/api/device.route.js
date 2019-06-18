const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const Device = require('../../model/Device');

/* ----- 
  @route  GET api/device
  @desc   Get all device
-----*/

router.get('/', async (req, res) => {
    try {
        const device = await Device.findAll();                
        res.json(device)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;