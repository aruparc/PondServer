const express = require('express');
const router = express.Router();

import { PondController } from '../controllers/pond_controller';
const pondController: PondController = new PondController();


// REPORTS ROUTES defs
//Get: return the match for a given userId and date
router.get('/match', (request, response) => pondController.getMatch(request, response));

//Put: create a new participant entry for a given userId and date (along more data attributes)
router.put('/participant', (request, response) => pondController.createParticipant(request, response));

//Put: for a given date, perform the matching process between participants for that date (needs authentication)
router.put('/matching', (request, response) => pondController.performMatching(request, response));

//Post: store a profile picture for the user
router.post('/picture', (request, response) => pondController.storePicture(request, response));

module.exports = router;