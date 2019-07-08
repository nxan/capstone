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
const session_db = require('./db/session_db');
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser())
var http = require("http").Server(app);
var io = require("socket.io")(http);
http.listen(8888)
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
io.on("connection", function (socket) {
    console.log("Connecting:" + socket.id);
    console.log("model:" + allClients);
    socket.on("disconnect", async function () {
        socket.on("session_live", function () {
            if (io.sockets.adapter.rooms[process.env.ROOM]) {
                // result
                console.log(io.sockets.adapter.rooms['rooms'].length);
            }

        })
        for (var i = 0; i < allClients.length; i++) {
            console.log("c:" + allClients[i].socket_id);
            if (allClients[i].socket_id == socket.id) {
                console.log(true);
                var date = new Date(Date.now()).toISOString();
                await session_page_db.update_session_page(date, allClients[i].session_page_id)
                if (allClients.length == 1) {
                    await session_db.updateSession(date, allClients[i].session_id);
                }
                allClients.splice(i, 1);
            }
            else if (allClients[i].socket_id == socket.id && allClients.length == 1) {
                var data_update = {
                    session_end_time: data,
                    exit_page_id: allClients[i].page_id
                }
                await session_db.updateSession(data_update, allClients[i].session_id);
                allClients.splice(i, 1);
            }
        }
    })
    socket.on("client-send-session", function (data) {
        console.log(data);

        var json = JSON.parse(data);
        var socketModel = { session_id: 0, session_page_id: 0, socket_id: 0 , page_id: 0};
        socketModel['session_id'] = json.session_id;
        socketModel['session_page_id'] = json.session_page_id;
        socketModel['socket_id'] = socket.id;
        socketModel['page_id'] = json.page_id;
        allClients.push(socketModel);
        socket.join(process.env.ROOM);
        io.sockets.emit("Server-send-data", data + ". This is server ");
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

app.use('/api/city', require('./routes/api/city.route'));
app.use('/api/country', require('./routes/api/country.route'));
app.use('/api/test', require('./routes/api/test.route'));
app.use('/api/page', require('./routes/api/page.route'))
app.use('/api/session_page', require('./routes/api/session_page.route'))
app.use('/api/stats', require('./routes/api/stats.route'))

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
