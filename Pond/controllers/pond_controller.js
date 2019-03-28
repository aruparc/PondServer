"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// APP IMPORTS
var pond_service_1 = require("../services/pond_service");
var response_1 = require("./helpers/response");
var upload = require('./helpers/multer');
var singleUpload = upload.single('image');
/**
 * @name PondController
 *
 * @description
 * This CONTROLLER is the endpoint for the frontend, it handles the api-routes for user-requests
 */
var PondController = /** @class */ (function () {
    function PondController() {
        // CONSTS ======
        // VARS ======
        this.pondService = new pond_service_1.PondService();
    }
    // ROUTE HANDLERS ======
    PondController.prototype.createUser = function (request, response) {
        //let userToken = request.query.token;
        var userToken = "000";
        var userId = request.query.userId;
        var userName = request.query.name;
        var userInfo = request.query.info;
        if (userToken === undefined || userToken === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userToken"));
        }
        else if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if (userName === undefined || userName === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userName"));
        }
        else if (userInfo === undefined || userInfo === null) {
            //response.statuscode = 400;
            //return response.json(ApiResponse.Error("Please specify query parameter: userInfo"));
            userInfo = "Someone interesting and new! It's gonna be legendary, yeehaw #PondIsBagging";
        }
        var userPromise = this.pondService.createUser(userToken, userId, userName, userInfo);
        return PondController.payloadHandler(response, userPromise);
    };
    PondController.prototype.updateUserInfo = function (request, response) {
        var userId = request.query.userId;
        var userInfo = request.query.info;
        if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if (userInfo === undefined || userInfo === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: info"));
        }
        var userInfoPromise = this.pondService.updateUserInfo(userId, userInfo);
        return PondController.payloadHandler(response, userInfoPromise);
    };
    PondController.prototype.getUserInfo = function (request, response) {
        var userId = request.query.userId;
        if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        var userInfoPromise = this.pondService.getUserInfo(userId);
        return PondController.payloadHandler(response, userInfoPromise);
    };
    PondController.prototype.storePicture = function (request, response) {
        //console.log("storePicture ", request);
        var userId = request.query.userId;
        var picString = request.body.picture;
        var pictureStorePromise = this.pondService.storePictureString(userId, picString);
        return PondController.payloadHandler(response, pictureStorePromise);
    };
    PondController.prototype.getPicture = function (request, response) {
        //console.log("getPicture ", request);
        var userId = request.query.userId;
        var pictureRetrievePromise = this.pondService.getPictureString(userId);
        return PondController.payloadHandler(response, pictureRetrievePromise);
    };
    PondController.prototype.getMatch = function (request, response) {
        var userId = request.query.userId;
        var date = request.query.date;
        if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if (date === undefined || date === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: date"));
        }
        var matchPromise = this.pondService.getMatch(userId, date);
        return PondController.payloadHandler(response, matchPromise);
    };
    PondController.prototype.updateMatchStatus = function (request, response) {
        var userId = request.query.userId;
        var date = request.query.date;
        var status = request.query.status;
        if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if (date === undefined || date === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: date"));
        }
        else if (status === undefined || status === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: status"));
        }
        var statusUpdatePromise = this.pondService.updateMatchStatus(userId, date, status);
        return PondController.payloadHandler(response, statusUpdatePromise);
    };
    PondController.prototype.createParticipant = function (request, response) {
        //let userToken = request.query.token;
        var userToken = "000";
        var userId = request.query.userId;
        var userName = request.query.name;
        var date = request.query.date;
        var time = request.query.time;
        if (userToken === undefined || userToken === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userToken"));
        }
        else if (userId === undefined || userId === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if (userName === undefined || userName === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: userName"));
        }
        else if (date === undefined || date === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: date"));
        }
        else if (time === undefined || time === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: time"));
        }
        var participantPromise = this.pondService.createParticipant(userToken, userId, userName, date, time);
        return PondController.payloadHandler(response, participantPromise);
    };
    PondController.prototype.performMatching = function (request, response) {
        var authorizationToken = request.query.token;
        var date = request.query.date;
        if (authorizationToken === undefined || authorizationToken === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: authorizationToken"));
        }
        else if (date === undefined || date === null) {
            response.statuscode = 400;
            return response.json(response_1.ApiResponse.Error("Please specify query parameter: date"));
        }
        var matchingPromise = this.pondService.performMatching(authorizationToken, date);
        return PondController.payloadHandler(response, matchingPromise);
    };
    // HELPERS ======
    PondController.voidHandler = function (res, promise) {
        return promise
            .then(res.json(response_1.ApiResponse.OK()))
            .catch(function (err) {
            res.statuscode = 400;
            return res.json(response_1.ApiResponse.Error(err));
        });
    };
    //promise: Promise<T>
    PondController.payloadHandler = function (res, promise, statusCodeResolver) {
        return promise
            .then(function (resp) {
            console.log("payloadHandler ", resp);
            var statusCode = (statusCodeResolver) ? statusCodeResolver(resp) : 200;
            return res.json(response_1.ApiResponse.WithPayload(statusCode, resp));
        })
            .catch(function (err) {
            console.error('Error while processing NLU Gateway service', err);
            res.statuscode = 400;
            return res.json(response_1.ApiResponse.Error(err));
        });
    };
    return PondController;
}());
exports.PondController = PondController;
