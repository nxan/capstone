const express = require('express');
const router = express.Router();
const Video = require('../../model/Video');
const video_db = require('../../db/video_db')
const
    multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()

    , getStream = require('into-stream')
    , containerName = 'video'
    ;
var request = require('request');
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
    // request.get('https://videoshopify.blob.core.windows.net/' + 'video/' + video.session_id + '.json', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var csv = body;
    //         readData = makePlayableString(csv);
    //         res.send(readData);
    //     }

    // });
    fs.readFile('recordings/capstonefpt.myshopify.com' + '/' + video.id + '.json', (err, data) => {
        if (err) {
            res.status(400).send('error on reading');
        } else {
            var readData = [];
            readData = makePlayableString(data);
            // video.events = readData;
            // var data = {};
            // data.video_id = video.id;
            // data.session_id = video.session_id;
            // data.url_video = video.url_video;
            // data.events = readData
            //console.log(readData)
            res.send(readData);
        }

    })


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
module.exports = router;