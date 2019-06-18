const express = require('express');
const router = express.Router();

const Browser = require('../../model/Browser');

/* ----- 
  @route  GET api/browser
  @desc   Get all browser
-----*/

router.get('/', async (req, res) => {
    try {
        const browser = await Browser.findAll();                
        res.json(browser);        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;