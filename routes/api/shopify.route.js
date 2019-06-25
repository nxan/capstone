const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const path = require('path');
const request = require('request-promise');
const nonce = require('nonce')();
const axios = require('axios')
const shop_db = require('../../db/shop_db')
const page_db = require('../../db/page_db')

const apiKey = process.env.SHOPIFY_API_KEY;
const apiKeySecret = process.env.SHOPIFY_API_SECRET;
const scope = 'write_products,read_script_tags,write_script_tags';
const forwardingAddress = process.env.DOMAIN;
const app = express();

// var func = require('./../func')

app.use(express.static(path.join(__dirname, 'public')));
/* ----- 
  @route  GET api/shopify
  @desc   Add app to shop
-----*/

router.get('/', async (req, res) => {
    const shop = req.query.shop;
    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/api/shopify/addScript';
        const installUrl = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey
            + '&scope=' + scope
            + '&state=' + state
            + '&redirect_uri=' + redirectUri
            ;
        console.log(installUrl)
        res.cookie('state', state);

        res.redirect(installUrl);

    } else {
        return res.status(400).send('missing shop parameter')
    }
});
/* ----- 
  @route  GET api/shopify/addScript
  @desc   Add script to shop
-----*/
router.get('/addScript', async (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const accessTokenRequestUrl = "https://" + shop + '/admin/oauth/access_token';
    const accesTokenPayLoad = {
        client_id: apiKey,
        client_secret: apiKeySecret,
        code
    };

    request.post(accessTokenRequestUrl, { json: accesTokenPayLoad })
        .then((accessTokenResponse) => {
            const accessToken = accessTokenResponse.access_token;
            // DONE: Use access token to make API call to 'script_tags' endpoint
            const createScriptTagUrl = 'https://' + shop + '/admin/api/2019-04/script_tags.json/';
            const shopRequestHeaders = {
                'X-Shopify-Access-Token': accessToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            };
            const scriptTagBody = {
                "script_tag": {
                    "event": "onload",
                    "src": forwardingAddress + "/api/shopify/getScript",
                }
            };
            var getProductsField = {}
            getProductsField.shop = shop
            getProductsField.accessToken = accessToken
            console.log(getProductsField)
            request.post({ url: createScriptTagUrl, form: scriptTagBody, headers: shopRequestHeaders })
                .then(async (responses) => {
                    await axios.post(process.env.DOMAIN + '/api/shopify/products', getProductsField)
                        .then((response) => {
                            res.send("Done")
                        })
                        .catch((error) => {
                            // handle error
                            console.log(error);
                        })
                })
        })
        .catch((error) => {
            res.status(403).send(error.error.error_description);
        });
})
/* ----- 
  @route  GET api/shopify/getScript
  @desc   get script file
-----*/
router.get('/getScript', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'js', 'tracking.js'));
})
/* ----- 
  @route  POST api/shopify/saveInformation
  @desc   save information
-----*/
router.get('/getScript', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'js', 'tracking.js'));
})

router.post('/saveInformation', async (req, res) => {
    // var ip = req.headers['x-forwarded-for'];
    // var location = func.getLocation(ip);
    // var location = {ip:ip}    
    // res.send(JSON.stringify(location));
})

router.post('/products', function (req, res, next) {
    let shop = req.body.shop
    let url = 'https://' + shop + '/admin/products.json';

    let options = {
        method: 'GET',
        uri: url,
        json: true,
        headers: {
            'X-Shopify-Access-Token': req.body.accessToken,
            'content-type': 'application/json'
        }
    };

    request(options)
        .then(async function (response) {
            var products = response.products
            console.log(shop)
            var shop_infor = await shop_db.getShop(shop)
            var shopId = shop_infor.id
            console.log(shopId)
            Array.from(products).forEach((element) => {
                url = shop + '/products/' + element.handle
                console.log(url)                
                console.log(shopId)
                page_db.addPage(url, shopId)
            });
            res.end()
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});
module.exports = router;