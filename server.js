const express = require('express');
var session = require('express-session');
const querystring = require('querystring');
const path = require('path');
var cors = require('cors')
var favicon = require('serve-favicon')
const db = require('./config/db');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var allClients = [];
var onlines = [];
const session_db = require('./db/session_db');
const video_db = require('./db/video_db');
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser())
const axios = require('axios')
var http = require("http").Server(app);
var io = require("socket.io")(http);
var count = 0;
var fs = require('fs');
let fileName = 'events';
var $ipsConnected = [];
const PORT = process.env.PORT || 8888;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const session_page_db = require('./db/session_page_db');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const
    multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService('videoshopifystorage', '6cNKqrtKmKImlaq5GPH7GLDHBmE5C1roXWcfdu1clo4cbiELtm0jtw7dvflB7ILQSKb0fDimSQ9T37Sqi8l9xg==')

    , getStream = require('into-stream')
    , containerName = 'videoshopify'
    ;

db.authenticate()
    .then(() => console.log('Database connected....'))
    .catch(err => console.log('Error' + err))

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.set('trust proxy', 1)
app.use(session({
    secret: '123',
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 3600,
        secure: false
    }
}))

app.get('/', (req, res) => {
    res.send("API running");
});
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
function getAquision(number) {
    switch (number) {
        case 1: return process.env.Social
            break;
        case 2: return process.env.Search
            break;
        case 3: return process.env.Direct
            break;
        case 4: return process.env.Other
            break;
    }
}
function getOS(number) {
    switch (number) {
        case 1: return process.env.Android
            break;
        case 2: return process.env.MacOs
            break;
        case 3: return process.env.Window
            break;
        case 4: return process.env.iOS
            break;
        case 5: return process.env.Linux
            break;
        case 6: return process.env.Other
            break;
    }
}
function getBrowser(number) {
    switch (number) {
        case 1: return process.env.Opera
            break;
        case 2: return process.env.Edge
            break;
        case 3: return process.env.Firefox
            break;
        case 4: return process.env.Chrome
            break;
        case 5: return process.env.Safari
            break;
        case 6: return process.env.others
            break;
    }
}
function getDevice(number) {
    switch (number) {
        case 1: return process.env.tablet
            break;
        case 2: return process.env.mobile
            break;
        case 3: return process.env.desktop
            break;
        case 4: return process.env.others
            break;
    }
}
function groupBy(allClients, key) {
    // array.reduce((objectsByKeyValue, obj) => {
    //     const value = obj[key];
    //     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    //     return objectsByKeyValue;
    // }, {});
    var counts = allClients.reduce((p, c) => {
        var name = c[key];
        if (!p.hasOwnProperty(name)) {
            p[name] = 0;
        }
        p[name]++;
        return p;
    }, {});
    var countsExtended = Object.keys(counts).map(k => {
        return { name: k, count: counts[k] };
    });
    return countsExtended;
}
io.on("connection", function (socket) {
    //console.log("Connecting:" + socket.id);
    // for (var i = 0; i < allClients.length; i++) {
    //     console.log("model:" + allClients[i].socket_id);

    // }
    // if(check){
    //     socket.emit('online', allClients.length);
    //     var counts = allClients.reduce((p, c) => {
    //         var name = c.page_url;
    //         if (!p.hasOwnProperty(name)) {
    //             p[name] = 0;
    //         }
    //         p[name]++;
    //         return p;
    //     }, {});
    //     countsExtended = Object.keys(counts).map(k => {
    //         return { name: k, count: counts[k] };
    //     });
    //     // socket.emit('locations', locations);
    //     socket.emit('online_os', groupBy(allClients, 'os'));
    //     socket.emit('online_dv', groupBy(allClients, 'device'));
    //     socket.emit('online_bw', groupBy(allClients, 'browser'));
    //     socket.emit('online_ac', groupBy(allClients, 'acquistion'));
    //     socket.emit('online_page', countsExtended);
    //     check = false;
    // }
    // setInterval(function () {
    //     //socket.emit('online', Object.keys(io.sockets.connected).length - 1);
    //     socket.emit('online', onlines.length);
    //     var counts = onlines.reduce((p, c) => {
    //         var name = c.page_url;
    //         if (!p.hasOwnProperty(name)) {
    //             p[name] = 0;
    //         }
    //         p[name]++;
    //         return p;
    //     }, {});
    //     var countsExtended = Object.keys(counts).map(k => {
    //         return { name: k, count: counts[k] };
    //     });
    //     //console.log(countsExtended)
    //     // socket.emit('locations', locations);
    //     socket.emit('online_os', groupBy(onlines, 'os'));
    //     socket.emit('online_dv', groupBy(onlines, 'device'));
    //     socket.emit('online_bw', groupBy(onlines, 'browser'));
    //     socket.emit('online_ac', groupBy(onlines, 'acquistion'));
    //     socket.emit('online_page', countsExtended);
    // }, 2000)

    socket.on("session_live", function () {
        if (io.sockets.adapter.rooms[process.env.ROOM]) {
            // resultt
            console.log(io.sockets.adapter.rooms['rooms'].length - 1);
            var length = io.sockets.adapter.rooms['rooms'].length - 1;
            io.sockets.emit("Total-user", length + ". This is server ");
        }
    })
    // socket.on('client_send_video', function (data) {
    //     var json = JSON.parse(data);
    //     let dir = 'recordings/' + json.shop;
    //     console.log('video:' + json.shop + '- ' + dir);

    //     if (!fs.existsSync(dir)) {
    //         fs.mkdirSync(dir);
    //     }
    //     fs.appendFile('recordings/' + json.shop + '/' + json.session_id + '.json', JSON.stringify(json.video) + ',', (err) => {
    //         if (err) {
    //             console.log(err);
    //             // res.status(400).send('error on recording');
    //         } else {
    //             console.log('events updated');
    //             //  res.send("event received");
    //         }
    //     })
    // })
    socket.on("disconnect", async function () {
        for (var i = 0; i < allClients.length; i++) {
            // console.log("c:" + allClients[i].socket_id);
            if (allClients[i].socket_id == socket.id) {
                console.log(true)
                // console.log(true + ":" + allClients[i].socket_id );
                var date = new Date(Date.now()).toISOString();
                // for (var j = 0; j < allClients.length; j++) {

                //     await session_page_db.update_session_page(date, allClients[j].session_page_id)
                // }
                await session_page_db.update_session_page(date, allClients[i].session_page_id)

                var data_update = {
                    session_end_time: date,
                    exit_page_id: allClients[i].page_id
                }
                await session_db.updateSession(data_update, allClients[i].session_id);

                allClients.splice(i, 1);
            }
            else if (allClients[i].socket_id == socket.id && allClients.length == 1) {
                // console.log(false + ":" + allClients[i].socket_id );
                var date = new Date(Date.now()).toISOString();
                var data_update = {
                    session_end_time: date,
                    exit_page_id: allClients[i].page_id
                }

                await session_db.updateSession(data_update, allClients[i].session_id);
                allClients.splice(i, 1);
            }

        }
        //console.log(socket.adapter.rooms)


        //console.log(io.sockets.adapter.rooms[onlines[i].session_id].length)
        for (var i = 0; i < onlines.length; i++) {
            if (onlines[i].socket_id == socket.id && onlines[i].session_length == 1) {
                var videoFields = {};
                videoFields.session_id = onlines[i].session_id;
                videoFields.url_video = onlines[i].session_id;
                var video = await video_db.addVideo(videoFields);
                var filename = 'recordings/' + onlines[i].shop + '/' + onlines[i].session_id + '.json';
                var buffer = bufferFile(filename);
                const
                    blobName = video.id + '.json'
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
                var filePath = 'recordings/' + onlines[i].shop + '/' + onlines[i].session_id + '.json';
                fs.unlinkSync(filePath);
                onlines.splice(i, 1);
            }
            if (onlines[i].socket_id == socket.id) {
                onlines[i].session_length -= 1;
            }


            //socket.leave(onlines[i].socket_id)
        }
        console.log(onlines);
        console.log(socket.id + ":disconnected")
    })
    socket.on("client-send-session", function (data) {
        console.log(data);

        var json = JSON.parse(data);
        var socketModel = { session_id: 0, session_page_id: 0, socket_id: 0, page_id: 0, page_url: '', device: '', os: '', browser: '', acquistion: '' };
        socketModel['session_id'] = json.session_id;
        socketModel['session_page_id'] = json.session_page_id;
        socketModel['socket_id'] = socket.id;
        socketModel['page_id'] = json.page_id;
        socketModel['shop'] = json.shop;
        socketModel['page_url'] = json.page_url;
        socketModel['device'] = getDevice(json.device_type_id);
        socketModel['os'] = getOS(json.operating_system_id);
        socketModel['browser'] = getBrowser(json.browser_id);
        socketModel['acquistion'] = getAquision(json.acquistion_id);
        allClients.push(socketModel)
        //console.log(json);
        // if (allClients.length <= 0) {
        //     allClients.push(socketModel);
        //     console.log(allClients)
        //     socket.join(process.env.ROOM);
        // } else {
        //     for (var i = 0; i < allClients.length; i++) {
        //         if (allClients[i].session_id != json.session_id) {
        //             // allClients.push(socketModel);
        //         } else {
        //             allClients[i].page_url = json.page_url;
        //         }
        //         console.log("online: " + io.sockets.adapter.rooms[process.env.ROOM].length);
        //     }
        // }

        for (var i = 0; i < onlines.length; i++) {
            if (onlines[i].session_id != json.session_id) {

            } else {
                check_change_page = true;
                onlines[i].socket_id = socket.id;
                onlines[i].session_length = onlines[i].session_length + 1
                onlines[i].page_url = json.page_url;
            }
            //console.log("online: " + io.sockets.adapter.rooms[process.env.ROOM].length);
        }

        if (!check_change_page) {
            socketModel.session_length = 1;
            onlines.push(socketModel);
            socket.join(process.env.ROOM);
        }

        socket.join(json.session_id);
        io.sockets.emit("Server-send-data", data);
    })
});
app.post('/api', (req, res) => {
    console.log(req.body)
    fs.appendFile('recordings/' + fileName + '.json', JSON.stringify(req.body) + ',', (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('error on recording');
        } else {
            console.log('events updated');
            res.send("event received");
        }
    })
});
app.use('/api/user', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
// app.use('/api/profile', require('./routes/api/shop.route'));
app.use('/api/os', require('./routes/api/os.route'));
app.use('/api/device', require('./routes/api/device.route'));
app.use('/api/browser', require('./routes/api/browser.route'));
app.use('/api/session', require('./routes/api/session.route'));
app.use('/api/shopify', require('./routes/api/shopify.route'));
app.use('/api/shop', require('./routes/api/shop.route'));
app.use('/api/video', require('./routes/api/video.route'));
app.use('/api/city', require('./routes/api/city.route'));
app.use('/api/country', require('./routes/api/country.route'));
app.use('/api/test', require('./routes/api/test.route'));
app.use('/api/page', require('./routes/api/page.route'))
app.use('/api/session_page', require('./routes/api/session_page.route'))
app.use('/api/stats', require('./routes/api/stats.route'))
app.use('/api/behaviors', require('./routes/api/behavior.route'))

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
