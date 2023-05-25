const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./src/models/connection');
const redis = require('redis');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require("cookie-parser");
require('./src/config/passport')(passport);
const RedisStore = require("connect-redis").default;

const port = process.env.PORT || 3001;
const path = require('path');
const bodyParser = require('body-parser');
const routes = require(path.join(__dirname, 'src/routes/route'))(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// -------------- END OF MIDDLEWARE____________

//******************* Redis Implementation **********************

// Initialize client.
// let redisClient = redis.createClient({ url: 'redis://127.0.0.1:6379'})
let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
})

app.use(
    session({
        store: redisStore,
        secret: "keyboard cat",
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie 
            maxAge: 1000 * 60 * 100 // session max age in miliseconds
        }
    })
)

app.use(cookieParser("keyboard cat"));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(port, () => console.log(`App Listening On the port ${port}`));