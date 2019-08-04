const express = require('express');
const router = express.Router();
const video_db = require('../../db/video_db')
const bodyParser = require('body-parser')
const app = express();
const dateFormat = require('dateformat');
const path = require('path');
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
    var condition = {
        order: [
            ['id', 'DESC'],
        ]
    }
    var video = await video_db.getAll(condition);
    var result = []
    for (var i = 0; i < video.length; i++) {
        var model = {};
        model.id = video[i].id;
        //model.date_time =  video[i].date_time.toISOString().replace(/T/, " ").replace(/\..+/,'')
        model.date_time = dateFormat(video[i].date_time, "ddd mmm dd yyyy HH:MM:ss ")
        result.push(model);
    }
    res.json(result);

});
router.get('/getOne/:video_id', async (req, res, next) => {
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
});
router.post('/', async (req, res, next) => {
    var condition = { where: session_id = req.body.session_id }
    var video = await video_db.getAll(condition);
    res.json(video);
});


router.post('/sendVideo', async (req, res, next) => {
    var url = './recordings/' + req.body.shop + '/' + req.body.session_id + '.json';
    fs.appendFile(url, JSON.stringify(req.body.video) + ',', (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('error on recording');
        } else {
            // console.log('events updated');
            res.send("event received");
        }
    })
});
router.post('/sendHeatMap', async (req, res, next) => {
    //convert array => string, getStream only accept String or Buffer

    var shop = req.body.shop;
    var heatmap = req.body.heat_map;
    var stringStream = JSON.stringify(heatmap);
    var url = './heatmap/' + req.body.shop + '.json';
    fs.appendFile(url, JSON.stringify(req.body.heat_map) + ',', (err) => {
        if (err) {
            console.log(err);
            //res.status(400).send('error on recording');
        } else {
            console.log('events updated');
            // res.send("event received");
        }
    })
    var url = 'https://videoshopifystorage.blob.core.windows.net/heatmapshopify/' + req.body.shop + '.json';
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var data = body + '' + JSON.stringify(heatmap);
            // var stringStream = JSON.stringify(data);
            var filename = './heatmap/' + shop + '.json';
            var buffer = bufferFile(filename);
            const
                blobName = shop + '.json'
                , stream = getStream(buffer)
                , streamLength = buffer.length
                ;

            blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
                if (!err) {
                    console.log("upload file success");

                }
                else {
                    console.log(err);
                }
            });
            //res.send(readData);
        }
        else {
            // var stringStream = JSON.stringify(heatmap);
            var filename = './heatmap/' + shop + '.json';
            var buffer = bufferFile(filename);
            const
                blobName = shop + '.json'

                , stream = getStream(buffer)
                , streamLength = buffer.length
                ;

            blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
                if (!err) {
                    console.log("upload file success");

                }
                else {
                    console.log(err);
                }
            });
            //res.send(404)
        }
    });

})

router.get('/getOneHeatMap', async (req, res, next) => {
    var url = 'https://videoshopifystorage.blob.core.windows.net/heatmapshopify/' + req.params.shop + '.json';
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = body;
            readData = makePlayableString(csv);
            res.send(body);
        }
        else {
            res.send(404)
        }
    });
});

function makePlayableString(argument) {
    let stringArgument = argument.toString();
    stringArgument = stringArgument.substring(0, stringArgument.length - 1);
    let playableString = '[' + stringArgument + ']';
    return playableString;
}
function bufferFile(relPath) {
    return fs.readFileSync(relPath);
}
module.exports = router;