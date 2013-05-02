
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.use(express.cookieParser());
  app.use(express.session({ secret: "fus roh da!"}));
  app.use(express.favicon());
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//Setup our routes
app.get('/', routes.index); //Used by web browsers, render views
app.post('/login', routes.login); //The login route, sets up server session.
app.get('/username', routes.checkSession);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
