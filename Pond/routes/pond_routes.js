"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var pond_controller_1 = require("../controllers/pond_controller");
var pondController = new pond_controller_1.PondController();
// REPORTS ROUTES defs
//Get: return the match for a given userId and date
router.get('/match', function (request, response) { return pondController.getMatch(request, response); });
//Put: create a new participant entry for a given userId and date (along more data attributes)
router.put('/participant', function (request, response) { return pondController.createParticipant(request, response); });
//Put: for a given date, perform the matching process between participants for that date (needs authentication)
router.put('/matching', function (request, response) { return pondController.performMatching(request, response); });
module.exports = router;
