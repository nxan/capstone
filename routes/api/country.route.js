const express = require('express');
const router = express.Router();

const Country = require('../../model/Country');


router.get('/', async (req, res) => {
    try {
        const os = await Os.findAll();                
        res.json(os)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const os = await Os.findAll();                
        res.json(os)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});