"use strict";
// LIB IMPORTS ======
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
// APP IMPORTS ======
// CREATE SERVER ======
var app = express();
// APP CONFIGS ======
var bootstrap_1 = require("./config/bootstrap");
bootstrap_1.bootstrapApp(app);
// ROUTES ======
var routes_1 = require("./routes/routes");
routes_1.initRoutes(app);
// STD-RESPONSES ======
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
