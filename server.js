const express = require('express');
var session = require('express-session');
const querystring = require('querystring');
const path = require('path');
var cors = require('cors')
const request = require('request-promise');
var favicon = require('serve-favicon')
const db = require('./config/db');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var allClients = [];
var allOnlinePage = [];
var forwarded = require('forwarded-for');
const session_db = require('./db/session_db');
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser())
const axios = require('axios')
var http = require("http").Server(app);
var io = require("socket.io")(http);
var count = 0;
var locations = [];
var countsExtended = [];
const PORT = process.env.PORT || 8888;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const session_page_db = require('./db/session_page_db');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    countsExtended = Object.keys(counts).map(k => {
        return { name: k, count: counts[k] };
    });
    return countsExtended;
}
io.on("connection", function (socket) {
    console.log("Connecting:" + socket.id);
    for (var i = 0; i < allClients.length; i++) {
        console.log("model:" + allClients[i].socket_id);

    }

    setInterval(function () {
        //socket.emit('online', Object.keys(io.sockets.connected).length - 1);
        socket.emit('online', allClients.length);
        var counts = allClients.reduce((p, c) => {
            var name = c.page_url;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});
        countsExtended = Object.keys(counts).map(k => {
            return { name: k, count: counts[k] };
        });
        socket.emit('locations', locations);
        socket.emit('online_os', groupBy(allClients, 'os'));
        socket.emit('online_dv', groupBy(allClients, 'device'));
        socket.emit('online_bw', groupBy(allClients, 'browser'));
        socket.emit('online_ac', groupBy(allClients, 'acquistion'));
        socket.emit('online_page', countsExtended);
    }, 2000)

    socket.on("session_live", function () {
        if (io.sockets.adapter.rooms[process.env.ROOM]) {
            // resultt
            console.log(io.sockets.adapter.rooms['rooms'].length - 1);
            var length = io.sockets.adapter.rooms['rooms'].length - 1;
            io.sockets.emit("Total-user", length + ". This is server ");
        }
    })

    socket.on("disconnect", async function () {
        for (var i = 0; i < allClients.length; i++) {
            console.log("c:" + allClients[i].socket_id);
            if (allClients[i].socket_id == socket.id) {
                console.log(true);
                var date = new Date(Date.now()).toISOString();
                await session_page_db.update_session_page(date, allClients[i].session_page_id)
                if (allClients.length == 1) {
                    var data_update = {
                        session_end_time: date,
                        exit_page_id: allClients[i].page_id
                    }
                    await session_db.updateSession(data_update, allClients[i].session_id);
                }
                allClients.splice(i, 1);
            }
            else if (allClients[i].socket_id == socket.id && allClients.length == 1) {
                var date = new Date(Date.now()).toISOString();
                var data_update = {
                    session_end_time: date,
                    exit_page_id: allClients[i].page_id
                }
                await session_db.updateSession(data_update, allClients[i].session_id);
                allClients.splice(i, 1);
            }
        }
        console.log("disconnected")
    })

    socket.on("client-send-session", async function (data) {
        var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
        console.log('ip_v2:' + socket.request.connection.remoteAddress);
        let api_Key = process.env.IPIFY_API_KEY;
        let location
        await axios.get(`https://geo.ipify.org/api/v1?apiKey=${api_Key}&ipAddress=${ip}`)
            .then((response) => {
                location = response.data.location
            })
        locations.push(location);
        console.log(location);
        var json = JSON.parse(data);
        var socketModel = { session_id: 0, session_page_id: 0, socket_id: 0, page_id: 0, page_url: '', device: '', os: '', browser: '', acquistion: '' };
        socketModel['session_id'] = json.session_id;
        socketModel['session_page_id'] = json.session_page_id;
        socketModel['socket_id'] = socket.id;
        socketModel['page_id'] = json.page_id;
        socketModel['page_url'] = json.page_url;
        socketModel['device'] = getDevice(json.device_type_id);
        socketModel['os'] = getOS(json.operating_system_id);
        socketModel['browser'] = getBrowser(json.browser_id);
        socketModel['acquistion'] = getAquision(json.acquistion_id);
        //console.log(json);
        if (allClients.length == 0) {
            allClients.push(socketModel);
            console.log(allClients)
            socket.join(process.env.ROOM);
        } else {
            for (var i = 0; i < allClients.length; i++) {
                if (allClients[i].session_id != json.session_id) {
                    allClients.push(socketModel);
                } else {
                    allClients[i].page_url = json.page_url;
                }
                console.log("online: " + io.sockets.adapter.rooms[process.env.ROOM].length);
            }
        }


        io.sockets.emit("Server-send-data", data);
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



//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
