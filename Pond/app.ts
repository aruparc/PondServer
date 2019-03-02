// LIB IMPORTS ======

let express = require('express');

// APP IMPORTS ======

// CREATE SERVER ======
let app = express();


// APP CONFIGS ======
import  { bootstrapApp } from './config/bootstrap';
bootstrapApp(app);


// ROUTES ======
import  { initRoutes } from './routes/routes';
initRoutes(app);


// STD-RESPONSES ======
// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
    let err: any = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
