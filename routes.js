//routes.js
module.exports = function(app, passport) {
  //gateway page
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });
  
  // app.get('/main', function(req, res) {
  //   res.render('main.ejs'); // the app file itself?
  // });

  //login
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });
  // app.post('/login', do all our passport stuff here);
  
  //signup aka new user
  app.get('/signup', function(req, res) {   
        res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // app.post('/signup', do all our passport stuff here);

  //profile - user data
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next(); //moves the user "forward"
    // if they aren't redirect them to the home page
    res.redirect('/');
}