const express = require('express')
const router = express.Router()
const sessionDB = require('../../db/sessionDB')
router.get('/',async (req, res) => {
   var result = await sessionDB.getAllSessions()
   res.json(result)
})
module.exports = router