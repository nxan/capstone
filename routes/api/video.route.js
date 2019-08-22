const express = require('express');
const router = express.Router();
const video_db = require('../../db/video_db')
const bodyParser = require('body-parser')
const app = express();
const dateFormat = require('dateformat');
const path = require('path');
const shop_db = require('../../db/shop_db')
const session_db = require('../../db/session_db')
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
router.get('/:shop_url', async (req, res, next) => {
    const shop_url = req.params.shop_url
    // var condition = {
    //     order: [
    //         ['id', 'DESC'],
    //     ]
    // }
    var video = await video_db.getAllByShop(shop_url);
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
    console.log("Ok video")
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