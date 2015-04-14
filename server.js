//server.js

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var app            = express();
var db             = require('./config/database.js'); //will hold our database connection info
var bcrypt = require('bcrypt'); //for salting user passwords
var flash = require('connect-flash'); //flash messages to user
var mongoose =require('mongoose');
var passport =require('passport');
var session = require('express-session');

//middleware setup
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json - just in case
app.use(methodOverride());                  // simulate DELETE and PUT
app.set('view engine', 'ejs');  //for ejs views vs plain html,  
app.use(cookieParser());  //set up cookies

//passport setup
app.use(session({ secret: 'NodeDashMePleaseWork' })); //will need for user authentication
app.use(passport.initialize()); 
app.use(passport.session());//user persistence
require('./config/passport')(passport); // pass passport for configuration

//db setup
// mongoose.connect(configDB.url); // connect to our database

//where is the app going...
require('./routes.js')(app, passport);

//turn on server
app.listen(3000);   
console.log('nodeDash UP!');         