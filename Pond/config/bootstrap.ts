// LIB IMPORTS
// const fs = require('fs'); // TODO: logging
import {DatabaseSingleton} from "./database";

import express from "express";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
export function bootstrapApp(app: any) {
    // GLOBAL VARS ======
    const allowOrigins = process.env.ALLOW_ORIGINS || '*';

    // FIX unhandled-rejections errors ------
    process.on("unhandledRejection", function(reason, promise) {
        console.log("Possibly Unhandled Rejection in bootstrap.ts:\n", reason, JSON.stringify(reason));
    });
    // ------

    //app.set('PORT', process.env.PORT || 3000);
    app.set('PORT', 80);
    //console.log('PORT', process.env.PORT);

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    // for favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", allowOrigins);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    DatabaseSingleton.Instance.setup();

    // TODO: LOGGING ======
//     const logFile = fs.createWriteStream('./express_log.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode
//     app.use(express.logger({stream: logFile}));
}
