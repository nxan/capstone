const express = require('express');
const router = express.Router();
const Video = require('../../model/Video');
const video_db = require('../../db/video_db')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const
    multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()

    , getStream = require('into-stream')
    , containerName = 'videoshopify'
    ;
var request = require('request');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const cors = require('cors');
// Session.hasMany(Video, { foreignKey: 'video_id', sourceKey: 'id' });
// Video.belongsTo(Session, { foreignKey: 'video_id', targetKey: 'id' });
const fs = require("fs");
function makePlayableString(argument) {
    let stringArgument = argument.toString();
    stringArgument = stringArgument.substring(0, stringArgument.length - 1);
    let playableString = '[' + stringArgument + ']';
    return playableString;
}
router.get('/', async (req, res, next) => {
    //var condition = { where: session_id = req.body.session_id }
    var video = await video_db.getAll();
    // request.get('https://videoshopify.blob.core.windows.net/' + 'video/' + video.session_id + '.json', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var csv = body;
    //         readData = makePlayableString(csv);
    //         res.send(readData);
    //     }

    // });
    res.json(video);
    // fs.readFile('recordings/' + data.shop_url + '/' + req.body.session_id + '.json', (err, data) => {
    //     if (err) {
    //         res.status(400).send('error on reading');
    //     } else {
    //         readData = makePlayableString(data);
    //         res.send(readData);
    //     }

    // });
});
router.get('/getOne/:video_id', async (req, res, next) => {
    // var condition = { where: id = req.params.video_id }
    // console.log(req.params.video_id)
    var video = await video_db.getVideo(req.params.video_id);
    var url = 'https://videoshopifystorage.blob.core.windows.net/videoshopify/' + req.params.video_id + '.json';
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
    // fs.readFile('recordings/capstonefpt.myshopify.com' + '/' + video.id + '.json', (err, data) => {
    //     if (err) {
    //         res.status(400).send('error on reading');
    //     } else {
    //         var readData = [];
    //         readData = makePlayableString(data);
    //         // video.events = readData;
    //         // var data = {};
    //         // data.video_id = video.id;
    //         // data.session_id = video.session_id;
    //         // data.url_video = video.url_video;
    //         // data.events = readData
    //         //console.log(readData)
    //         res.send(readData);
    //     }

    // })


});
router.post('/', async (req, res, next) => {
    var condition = { where: session_id = req.body.session_id }
    var video = await video_db.getAll(condition);
    // request.get('https://videoshopify.blob.core.windows.net/' + 'video/' + video.session_id + '.json', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var csv = body;
    //         readData = makePlayableString(csv);
    //         res.send(readData);
    //     }

    // });
    res.json(video);
    // fs.readFile('recordings/' + data.shop_url + '/' + req.body.session_id + '.json', (err, data) => {
    //     if (err) {
    //         res.status(400).send('error on reading');
    //     } else {
    //         readData = makePlayableString(data);
    //         res.send(readData);
    //     }

    // });
});


router.post('/sendVideo', async (req, res, next) => {
    var url = './recordings/' + req.body.shop + '/' + req.body.session_id + '.json';
    fs.appendFile(url, JSON.stringify(req.body.video) + ',', (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('error on recording');
        } else {
            console.log('events updated');
            res.send("event received");
        }
    })
});
router.post('/sendHeatMap', async (req, res, next) => {
    console.log(req.body)
    var url = './heatmap/' + req.body.shop + '.json';
    fs.appendFile(url, JSON.stringify(req.body.heat_map) + ',', (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('error on recording');
        } else {
            console.log('events updated');
            res.send("event received");
        }
    })
})

router.get('/getOneHeatMap', async (req, res, next) => {
    var url = 'https://videoshopifystorage.blob.core.windows.net/heatmapshopify/' + req.params.shop + '.json';
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var csv = body;
            // readData = makePlayableString(csv);
            res.send(body);
        }
        else {
            res.send(404)
        }
    });
});

module.exports = router;