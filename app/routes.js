//routes.js
module.exports = function(app, passport) {
  
  app.get('/', function(req, res) {   
    //i'm thinking for home we use this in case they don't authenticate with twitter, 
    //just the streaming app along with the location based twitter feed
    res.render('index.ejs'); // load the index.ejs file
  });
  
  // app.get('/main', function(req, res) {
  //   res.render('main.ejs'); // i'm thinking this is the route where we have twitter authentication and just 
  //rely on that, defaulting to index if no twitter info..what do you think 
  // });

  //login
  app.get('/login', function(req, res) {
    res.render('login.ejs');  // { message: req.flash('loginMessage') }
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  
  //signup aka new user
  app.get('/signup', function(req, res) {   
        res.render('signup.ejs');
        // , { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

  //profile - user data "the gear"
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
      });
  });
  
  //log out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// check login 
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next(); //moves the user "forward to what they intended"
    // if they aren't redirect them to the home page
    res.redirect('/');
}