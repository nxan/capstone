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
const session_db = require('../../db/session');
const app = express();
app.use(cors({credentials: true}))
app.use(cookieParser("secret"))
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
    resave: true,
    httpOnly: true, 
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000*20 ,
        secure: true
    }
}))

app.get('/', (req, res) => {
    res.send('API running');
});
io.on("connection", function (socket) {
    console.log("Connecting:" + socket.id);
    socket.on("disconnect", function () {
        for (var i = 0; i < allClients.length; i++) {
            console.log("c:" + allClients[i].socket_id);
            if (allClients[i].socket_id == socket.id) {
                console.log(true);
                var date = new Date().getTime() / 1000;
                session_page_db.pdate_session_page(date, allClients[i].session_page_id)
                allClients.splice(i, 1);
            }
            if(allClients[i].socket_id == socket.id && allClients.length == 1){
                session_db.updateSession(date, allClients[i].session_id);
                allClients.splice(i, 1);
            }
        }
    })
    socket.on("client-send-session", function (data) {
        console.log(data);

        var json = JSON.parse(data);
        var socketModel = { session_id: 0, session_page_id: 0, socket_id: 0 };
        socketModel['session_id'] = json.session_id;
        socketModel['session_page_id'] = json.session_page_id;
        socketModel['socket_id'] = socket.id;
        allClients.push(socketModel);
        socket.join(json.session_id);
        io.sockets.emit("Server-send-data", data + ". This is server ");
    })
});
app.use('/api/user', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
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
const PORT = process.env.PORT || 3000;
app.use('/api/video', require('./routes/api/video.route'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
