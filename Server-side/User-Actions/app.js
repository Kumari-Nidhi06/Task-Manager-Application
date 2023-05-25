const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./src/models/connection');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis').default;

const port = process.env.PORT || 3002;
const path = require('path');
const routes = require(path.join(__dirname, 'src/routes/route'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
    client: redisClient,
})

app.use(session({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 100
    }
}))

app.use(cookieParser("keyboard cat"));

app.use('/', routes);
app.listen(port, () => console.log(`App Listening On the port ${port}`));