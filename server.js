const express = require('express');
var session = require('express-session');
const querystring = require('querystring');
const path = require('path');
var cors = require('cors')
const request = require('request-promise');
var favicon = require('serve-favicon')
const db = require('./config/db');
const bodyParser = require('body-parser')
const app = express();
app.use(cors())
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
    saveUninitialized: true,
    cookie: {
        maxAge: 300000,
        secure: false
    }
}))

app.get('/', (req, res) => {
    res.send('API running');
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
