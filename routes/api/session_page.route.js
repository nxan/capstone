const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const { check, validationResult } = require('express-validator/check');

const session_page_db = require('../../db/session_page_db')
const page_db = require('../../db/page_db')
dotenv.config()

router.post('/', [], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let session_id = req.session.id
    let url = req.body.url
    let page = await page_db.getPage(url)
    session_page_infor = {
        session_id: session_id,
        page_id: page.id
    }
    let result = await session_page_db.add_session_page(session_page_infor)
    res.status(200).send('Done')
})


module.exports = router
