"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../config/database");
var sendEmail = require("./src/handlers/helpers/send_email_notification");
var PondService = /** @class */ (function () {
    function PondService() {
    }
    PondService.prototype.createUser = function (userToken, userId, password, userName, userInfo) {
        var _this = this;
        //console.log("createUser passwordHash", passwordHash);
        //check that userId is unique
        return database_1.DatabaseSingleton.Instance.userDao.getUser(userId).then(function (existingUserEntry) {
            if (existingUserEntry) {
                return "A user with this id already exists... so unless cloning has becoming possible, this request has to be changed.";
            }
            else {
                var passwordHash = _this.hashPassword(password);
                return database_1.DatabaseSingleton.Instance.userDao.updateUser(userToken, userId, passwordHash, userName, userInfo);
            }
        });
    };
    PondService.prototype.loginUser = function (userId, password) {
        //hash password and compare to stored password hash
        var passwordHash = this.hashPassword(password);
        return database_1.DatabaseSingleton.Instance.userDao.getUserPasswordHash(userId).then(function (storedPasswordHash) {
            //console.log("loginUser comparison", passwordHash == storedPasswordHash);
            return passwordHash == storedPasswordHash;
        });
    };
    PondService.prototype.getUserEntry = function (userId) {
        //return complete user entry except passwordHash
        return database_1.DatabaseSingleton.Instance.userDao.getUser(userId).then(function (existingUserEntry) {
            if (existingUserEntry) {
                //const {passwordHash, ...userEntryWithoutPasswordHash} = existingUserEntry;
                var userEntryWithoutPasswordHash = JSON.parse(JSON.stringify(existingUserEntry));
                delete userEntryWithoutPasswordHash.passwordHash;
                delete userEntryWithoutPasswordHash.userToken;
                delete userEntryWithoutPasswordHash._id;
                delete userEntryWithoutPasswordHash.__v;
                console.log("getUserEntry user entry without passwordHash ", userEntryWithoutPasswordHash);
                return userEntryWithoutPasswordHash;
            }
            else {
                return "A user entry with this id has not been created yet. That should have been the Creator's job on the 8th day but he had enough by then [Pond 1: 34-36].";
            }
        });
    };
    PondService.prototype.updateUserInfo = function (userId, userInfo) {
        return database_1.DatabaseSingleton.Instance.userDao.updateUserInfo(userId, userInfo);
    };
    PondService.prototype.getUserInfo = function (userId) {
        return database_1.DatabaseSingleton.Instance.userDao.getUserInfo(userId);
    };
    PondService.prototype.storePictureURL = function (userId, fileLocation) {
        return database_1.DatabaseSingleton.Instance.userDao.updateUserPictureURL(userId, fileLocation);
    };
    PondService.prototype.getPictureURL = function (userId) {
        return database_1.DatabaseSingleton.Instance.userDao.getUserPictureURL(userId);
    };
    PondService.prototype.storePictureString = function (userId, pictureString) {
        return database_1.DatabaseSingleton.Instance.userDao.updateUserPictureString(userId, pictureString);
    };
    PondService.prototype.getPictureString = function (userId) {
        return database_1.DatabaseSingleton.Instance.userDao.getUserPictureString(userId);
    };
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
    PondService.prototype.updateMatchStatus = function (userId, date, status) {
        return database_1.DatabaseSingleton.Instance.matchDao.updateMatchStatus(userId, date, status);
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
                                var locationOptions = ["Starbucks in Clough Commons", "Auntie Ann's in Student Center", "Subway in Student Center", "Blue Donkey in Student Center", "Panda Express in Student Center", "Burdell's in Student Center", "Chick-fil-A in Student Center"];
                                var randomNumber = Math.floor(Math.random() * (locationOptions.length - 1));
                                var location = locationOptions[randomNumber];
                                //create new match entry with date, time, p1, p2 and location (matchDao)
                                database_1.DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, participantEntry, otherParticipantEntry, location);
                                database_1.DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, otherParticipantEntry, participantEntry, location);
                                //set p1.matched:True, p2.matched:True (participantDao or memory?)
                                participantEntry.matched = true;
                                otherParticipantEntry.matched = true;
                                var mailOptionsParticipant = {
                                    from: 'Your Homeboys at Pond',
                                    to: participantEntry.userId,
                                    subject: 'You just got matched for lunch! Yeeeehaw!',
                                    html: '<h1>Get ready for a fun lunch with ' + otherParticipantEntry.userName + '!</h1>' +
                                        '</div>' +
                                        '<p>Hey ' + participantEntry.userName + ',</p>' +
                                        '<p>How is your day going so far? ' +
                                        'Here is another highlight: Lunch with your Pond match ' + otherParticipantEntry.userName + '. ' +
                                        'Meet at ' + location + ' at ' + participantEntry.time + '. ' +
                                        'Please be on-time, you won\'t wanna miss any of that fun!</p>' +
                                        '<p>Enjoy and Keep Ponding,</p>' +
                                        '<p>Your friends at Pond</p>' +
                                        '<p>P.s.</p>' +
                                        '<p><a href="http://pond--app.herokuapp.com/home">Login here</a></p>' +
                                        '<p>Did you like your experience? Tell your friends all about it!</p>' +
                                        '<p>Was something wrong? Tell us all about it!</p>' +
                                        '<p><a href="https://pondapp.github.io/Landing/">Come Visit the Pond Webpage, just bring a smile :)</a></p>'
                                };
                                sendEmail(mailOptionsParticipant);
                                var mailOptionsOtherParticipant = {
                                    from: 'Your Homeboys at Pond',
                                    to: otherParticipantEntry.userId,
                                    subject: 'You just got matched for lunch! Yeeeehaw!',
                                    html: '<h1>Get ready for a fun lunch with ' + participantEntry.userName + '!</h1>' +
                                        '</div>' +
                                        '<p>Hey ' + otherParticipantEntry.userName + ',</p>' +
                                        '<p>How is your day going so far? + ' +
                                        'Here is another highlight: Lunch with your Pond match ' + participantEntry.userName + '. ' +
                                        'Meet at ' + location + ' at ' + otherParticipantEntry.time + '. ' +
                                        'Please be on-time, you won\'t wanna miss any of that fun!</p>' +
                                        '<p>Enjoy and Keep Ponding,</p>' +
                                        '<p>Your friends at Pond</p>' +
                                        '<p>P.s.</p>' +
                                        '<p><a href="http://pond--app.herokuapp.com/home">Login here</a></p>' +
                                        '<p>Did you like your experience? Tell your friends all about it!</p>' +
                                        '<p>Was something wrong? Tell us all about it!</p>' +
                                        '<p><a href="https://pondapp.github.io/Landing/">Come Visit the Pond Webpage, just bring a smile :)</a></p>'
                                };
                                sendEmail(mailOptionsOtherParticipant);
                                break;
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
    PondService.prototype.storePictureURLParticipant = function (userId, fileLocation) {
        return database_1.DatabaseSingleton.Instance.participantDao.updateParticipantPictureURL(userId, fileLocation);
    };
    PondService.prototype.getPictureURLParticipant = function (userId) {
        return database_1.DatabaseSingleton.Instance.participantDao.getParticipantPictureURL(userId);
    };
    PondService.prototype.storePictureStringParticipant = function (userId, pictureString) {
        return database_1.DatabaseSingleton.Instance.participantDao.updateParticipantPictureString(userId, pictureString);
    };
    PondService.prototype.getPictureStringParticipant = function (userId) {
        return database_1.DatabaseSingleton.Instance.participantDao.getParticipantPictureString(userId);
    };
    ////Helper functions
    PondService.prototype.hashPassword = function (password) {
        var hash = 0, i, chr;
        if (password.length === 0)
            return hash;
        for (i = 0; i < password.length; i++) {
            chr = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    return PondService;
}());
exports.PondService = PondService;
