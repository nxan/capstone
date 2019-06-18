const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    getLocation: (ip) => {
        var api_Key = process.env.IPIFY_API_KEY;
        var url = `https://geo.ipify.org/api/v1?apiKey=${api_Key}&ipAddress=${ip}`;
        fetch(url).then(response => response.json()).then(data=>{
            return data;
        })
        return {a:ip}
    }
}