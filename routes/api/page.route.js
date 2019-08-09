const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const axios = require('axios')
const Page = require('../../model/Page')
const page_db = require('../../db/page_db');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser')
const shop_db = require('../../db/shop_db')
const cloudscraper = require('cloudscraper');
const mkdirp = require('mkdirp')
const
    multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService('videoshopifystorage', '6cNKqrtKmKImlaq5GPH7GLDHBmE5C1roXWcfdu1clo4cbiELtm0jtw7dvflB7ILQSKb0fDimSQ9T37Sqi8l9xg==')

    , getStream = require('into-stream')
    , containerName = 'heatmapshopify'
    ;
var request = require('request');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
dotenv.config()

router.post('/', async (req, res) => {
    var url = req.body.page_url

    let page = Page.findOne({
        where: {
            page_url: url
        }
    })
    var indexSlash = url.indexOf("/")
    var domainShop = url.substring(0, indexSlash)

    var shop_id
    if (page == null) {
        await axios.get(process.env.DOMAIN + "/api/shop/url/" + domainShop)
            .then((response) => {
                shop_id = response.data.shop_id
            })
        var page_field = {}
        page_field.page_url = urlRemovedHttp
        page_field.shop_id = shop_id
        try {
            page = new Page(page_field)
            await page.save()
            res.json(page)
        } catch (error) {
            console.log()
        }
    }

})

router.post('/sendHeatMap', async (req, res, next) => {
    //convert array => string, getStream only accept String or Buffer

    var shop = req.body.shop;
    var heatmap = req.body.heat_map;
    var stringStream = JSON.stringify(heatmap);
    var page = await page_db.getPage(req.body.page);
    var url = './heatmap/' + page.id + '.json';

    fs.appendFile(url, JSON.stringify(req.body.heat_map) + ',', (err) => {
        if (err) {
            console.log(err);
            //res.status(400).send('error on recording');
        } else {
            console.log('events updated');
            // res.send("event received");
        }
    })
    // var filename = './heatmap/' + page.id + '.json';
    // var buffer = bufferFile(filename);
    // const
    //     blobName = page.id + '.json'
    //     , stream = getStream(buffer)
    //     , streamLength = buffer.length
    //     ;

    // blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
    //     if (!err) {
    //         console.log("upload file success");

    //     }
    //     else {
    //         console.log(err);
    //     }
    // });

})
router.get('/getArrayHeatMap/:id', async (req, res) => {
    var page = await page_db.getPageById(req.params.id);
    var url = 'https://videoshopifystorage.blob.core.windows.net/heatmapshopify/' + page.id + '.json';
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = body;
            readData = makePlayableString(csv);
            res.send(readData);

        }
        else {
            res.send(404)
        }
    });
})
async function crawlWeb(url, res) {

    var reqWeb = "http://" + url;
    var dir = './web/' + url;
    if (!fs.existsSync(dir)) {
        mkdirp(dir, function (err) {
            console.log('ok,');
        });
    }
    cloudscraper.get(reqWeb).then(function (htmlString) {
        var path = './web/' + url + ".html";
        fs.writeFile(path, htmlString, (err) => {
            if (err) console.log(err);
            else {
                console.log("Successfully Written to File.");
                fs.readFile(path, "utf-8", (err, data) => {
                    var result = {
                        web: data
                    }
                    res.send(result);
                })
            }
        });
        // res.send(htmlString), console.error
    }
    );
}
router.get('/getOneHeatMap/:id', async (req, res, next) => {
    var page = await page_db.getPageById(req.params.id);
    var path = './web/' + page.page_url + '.html';
    if (!fs.existsSync(path)) {
        var crawl = await crawlWeb(page.page_url, res)
    } else {
        fs.readFile(path, "utf-8", (err, data) => {
            var result = {
                web: data
            }
            res.send(result);
        })
    }


});

function makePlayableString(argument) {
    let stringArgument = argument.toString();
    stringArgument = stringArgument.substring(0, stringArgument.length - 1);
    let playableString = '[' + stringArgument + ']';
    return playableString;
}
router.get('/getAll/:shop_url', async (req, res) => {
    const shop_url = req.params.shop_url
    let shop = await shop_db.getShop(shop_url);
    var pages = await page_db.getAllPageWithNotPage(shop);
    console.log(pages);
    res.json(pages);
})
router.get('/page_url/:url', async (req, res) => {
    var url = req.query.url
    page_id = -1
    var page = await Page.findOne({
        where: {
            page_url: url
        }
    })
    if (page != null) {
        res.json(page)
    }
    else {
        res.json({ page_id: page_id })
    }
})
function bufferFile(relPath) {
    return fs.readFileSync(relPath);
}
module.exports = router