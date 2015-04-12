// serversetup
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT
//end server setup


// call the Router EXPRESS 4.0 goodness
var root = express.Router();

    root.get('/', function(req, res, next) {
        // doing more stuff 
    });

    root.post('/', function(req, res, next) {
                // stuff stuff stuff
    });

// call our router we just created
app.use('/', root);


//turn on server
app.listen(3000);   
console.log('nodeDash UP!');          // shoutout to the user