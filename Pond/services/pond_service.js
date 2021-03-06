"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../config/database");
var PondService = /** @class */ (function () {
    function PondService() {
    }
    PondService.prototype.getMatch = function (userId, date) {
        return database_1.DatabaseSingleton.Instance.matchDao.getMatch(userId, date).then(function (matchEntry) {
            if (matchEntry) {
                //confirmed match for this user and date found
                //return this match
                return matchEntry;
            }
            else {
                //no confirmed match found
                //check if there is a pending match for this user and date (i.e. user has asked to receive a match already and become a participant)
                //or if the user has not created a participant for that date yet
                return database_1.DatabaseSingleton.Instance.participantDao.getParticipant(userId, date).then(function (participantEntry) {
                    if (participantEntry) {
                        //user created participant already, i.e. match is pending
                        //return pending match
                        return participantEntry;
                    }
                    else {
                        //user has not asked for a match for that date yet
                        //return empty
                        return {};
                    }
                });
            }
        });
    };
    PondService.prototype.createParticipant = function (userToken, userId, userName, date, time) {
        return database_1.DatabaseSingleton.Instance.participantDao.updateParticipant(userToken, userId, userName, date, time, false);
    };
    PondService.prototype.performMatching = function (authorizationToken, date) {
        //do authorization
        //get all participants for date (participantDao)
        return database_1.DatabaseSingleton.Instance.participantDao.getAllParticipants(date).then(function (allParticipantEntries) {
            if (allParticipantEntries) {
                //for each participant in date, find a match
                for (var _i = 0, allParticipantEntries_1 = allParticipantEntries; _i < allParticipantEntries_1.length; _i++) {
                    var participantEntry = allParticipantEntries_1[_i];
                    if (participantEntry.matched) {
                        //participant is matched already
                    }
                    else {
                        //if this participant p1 not matched yet, go on
                        //find participant p2 with different userId, same time and matched:False (participantDao or memory?)
                        //let foundMatch = false;
                        for (var _a = 0, allParticipantEntries_2 = allParticipantEntries; _a < allParticipantEntries_2.length; _a++) {
                            var otherParticipantEntry = allParticipantEntries_2[_a];
                            if (!otherParticipantEntry.matched && otherParticipantEntry.userId != participantEntry.userId && otherParticipantEntry.time == participantEntry.time) {
                                //it's a match
                                //foundMatch = true;
                                //get a location
                                var location = "Starbucks in Clough Commons";
                                //create new match entry with date, time, p1, p2 and location (matchDao)
                                database_1.DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, participantEntry, otherParticipantEntry, location);
                                database_1.DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, otherParticipantEntry, participantEntry, location);
                                //set p1.matched:True, p2.matched:True (participantDao or memory?)
                                participantEntry.matched = true;
                                otherParticipantEntry.matched = true;
                            }
                        }
                        //if no match found: no match today, continue loop
                    }
                }
                //if memory: write back updated entries to participantDao
                database_1.DatabaseSingleton.Instance.participantDao.updateAllParticipants(allParticipantEntries);
                return "Matching process was successful, let's hope they'll all have a great time!";
            }
            else {
                return "There are no participants for today, do more user acquisition.";
            }
        });
    };
    PondService.prototype.storePictureURL = function (userId, fileLocation) {
        return database_1.DatabaseSingleton.Instance.participantDao.updateParticipantPictureURL(userId, fileLocation);
    };
    PondService.prototype.getPictureURL = function (userId) {
        return database_1.DatabaseSingleton.Instance.participantDao.getParticipantPictureURL(userId);
    };
    return PondService;
}());
exports.PondService = PondService;
