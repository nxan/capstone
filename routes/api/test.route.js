const express = require('express')
const router = express.Router()
const axios = require('axios')
router.get('/',async (req, res) => {
    var ip = "203.205.35.142"
    var api_Key = process.env.IPIFY_API_KEY;
    var location
    var city_id
    await axios.get(`https://geo.ipify.org/api/v1?apiKey=${api_Key}&ipAddress=${ip}`)
        .then((response) =>{
           location = response.data
        })
    await axios.post(process.env.DOMAIN + '/api/city', location)
        .then(response => {
            city_id = response.data.id
        })
    res.json(city_id)
})
module.exports = router