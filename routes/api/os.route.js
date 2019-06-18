const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');


const Os = require('../../model/OperatingSystem');

/* ----- 
  @route  GET api/os
  @desc   Get all os
-----*/

router.get('/', async (req, res) => {
    try {
        const os = await Os.findAll();                
        res.json(os)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;