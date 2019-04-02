"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var pond_controller_1 = require("../controllers/pond_controller");
var pondController = new pond_controller_1.PondController();
// REPORTS ROUTES defs
//Put: create a new user entry for a given userId (along more data attributes)
router.put('/user', function (request, response) { return pondController.createUser(request, response); });
//Put: update a user's info for a given userId
router.put('/user/info', function (request, response) { return pondController.updateUserInfo(request, response); });
//Get: return a user's info for a given userId
router.get('/user/info', function (request, response) { return pondController.getUserInfo(request, response); });
//Post: store a profile picture for the given userId
router.post('/user/picture', function (request, response) { return pondController.storePicture(request, response); });
//Get: return a profile picture for the userId
router.get('/user/picture', function (request, response) { return pondController.getPicture(request, response); });
//Get: login the user for the userId and password
router.get('/user/login', function (request, response) { return pondController.loginUser(request, response); });
//Get: return the match for a given userId and date
router.get('/match', function (request, response) { return pondController.getMatch(request, response); });
//Put: update the status of the participant (arrived yet?)
router.put('/match/status', function (request, response) { return pondController.updateMatchStatus(request, response); });
//Put: create a new participant entry for a given userId and date (along more data attributes)
router.put('/participant', function (request, response) { return pondController.createParticipant(request, response); });
//Put: for a given date, perform the matching process between participants for that date (needs authentication)
router.put('/matching', function (request, response) { return pondController.performMatching(request, response); });
module.exports = router;
