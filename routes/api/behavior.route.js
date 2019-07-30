const express = require('express');
const router = express.Router();
const session_db = require('../../db/session_db')
router.get('/:id ', async (req,res)=>{
   try {
    const id = req.params.id
    sessions = session_db.getAllSessionsByCondition({shop_id:id})
    res.json(sessions)
   } catch (error) {
    console.log(err.message);
    res.status(500).send('Server error');
   }
})
module.exports = router