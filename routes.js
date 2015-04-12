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