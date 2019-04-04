const express = require('express');
const router = express.Router();

import { PondController } from '../controllers/pond_controller';
const pondController: PondController = new PondController();


// REPORTS ROUTES defs
//Post: create a new user entry for a given userId (along more data attributes), userId has to be unique
router.post('/user', (request, response) => pondController.createUser(request, response));

//Get: return a user's complete entry for a given userId (except passwordHash)
router.get('/user/entry', (request, response) => pondController.getUserEntry(request, response));

//Put: update a user's info for a given userId
router.put('/user/info', (request, response) => pondController.updateUserInfo(request, response));

//Get: return a user's info for a given userId
router.get('/user/info', (request, response) => pondController.getUserInfo(request, response));

//Post: store a profile picture for the given userId
router.post('/user/picture', (request, response) => pondController.storePicture(request, response));

//Get: return a profile picture for the userId
router.get('/user/picture', (request, response) => pondController.getPicture(request, response));

//Get: login the user for the userId and password
router.get('/user/login', (request, response) => pondController.loginUser(request, response));

//Get: return the match for a given userId and date
router.get('/match', (request, response) => pondController.getMatch(request, response));

//Put: update the status of the participant (arrived yet?)
router.put('/match/status', (request, response) => pondController.updateMatchStatus(request, response));

//Put: create a new participant entry for a given userId and date (along more data attributes)
router.put('/participant', (request, response) => pondController.createParticipant(request, response));

//Put: for a given date, perform the matching process between participants for that date (needs authentication)
router.put('/matching', (request, response) => pondController.performMatching(request, response));

module.exports = router;