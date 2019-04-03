import {DatabaseSingleton} from "../config/database";
import {CommonInterfaces} from "../interfaces/commonInterfaces";
const sendEmail = require("./src/handlers/helpers/send_email_notification");

export class PondService {

    constructor() {
    }

    createUser(userToken: any, userId: any, password: string, userName: any, userInfo: any) {
        let passwordHash = this.hashPassword(password);
        //console.log("createUser passwordHash", passwordHash);
        return DatabaseSingleton.Instance.userDao.updateUser(userToken, userId, passwordHash, userName, userInfo);
    }

    loginUser(userId: any, password: string) {
        //hash password and compare to stored password hash
        let passwordHash = this.hashPassword(password);
        return DatabaseSingleton.Instance.userDao.getUserPasswordHash(userId).then((storedPasswordHash) => {
            //console.log("loginUser comparison", passwordHash == storedPasswordHash);
            return passwordHash == storedPasswordHash
        });
    }

    updateUserInfo(userId: any, userInfo: any) {
        return DatabaseSingleton.Instance.userDao.updateUserInfo(userId, userInfo);
    }

    getUserInfo(userId: any) {
        return DatabaseSingleton.Instance.userDao.getUserInfo(userId);
    }

    storePictureURL(userId: String, fileLocation: String) {
        return DatabaseSingleton.Instance.userDao.updateUserPictureURL(userId, fileLocation);
    }

    getPictureURL(userId: String) {
        return DatabaseSingleton.Instance.userDao.getUserPictureURL(userId);
    }

    storePictureString(userId: String, pictureString: String) {
        return DatabaseSingleton.Instance.userDao.updateUserPictureString(userId, pictureString);
    }

    getPictureString(userId: String) {
        return DatabaseSingleton.Instance.userDao.getUserPictureString(userId);
    }

    getMatch(userId: any, date: any) {
        return DatabaseSingleton.Instance.matchDao.getMatch(userId, date).then((matchEntry) => {
            if(matchEntry){
                //confirmed match for this user and date found
                //return this match
                return matchEntry;
            }
            else{
                //no confirmed match found
                //check if there is a pending match for this user and date (i.e. user has asked to receive a match already and become a participant)
                //or if the user has not created a participant for that date yet
                return DatabaseSingleton.Instance.participantDao.getParticipant(userId, date).then((participantEntry) => {
                    if(participantEntry){
                        //user created participant already, i.e. match is pending
                        //return pending match
                        return participantEntry;

                    }
                    else{
                        //user has not asked for a match for that date yet
                        //return empty
                        return {};
                    }
                });
            }
        });

    }

    updateMatchStatus(userId: any, date: any, status: string) {
        return DatabaseSingleton.Instance.matchDao.updateMatchStatus(userId, date, status);
    }

    createParticipant(userToken: any, userId: any, userName: any, date: any, time: any) {
        return DatabaseSingleton.Instance.participantDao.updateParticipant(userToken, userId, userName, date, time, false);
    }

    performMatching(authorizationToken: any, date: any) {
        //do authorization

        //get all participants for date (participantDao)
        return DatabaseSingleton.Instance.participantDao.getAllParticipants(date).then((allParticipantEntries) => {
            if(allParticipantEntries){
                //for each participant in date, find a match
                for (let participantEntry of allParticipantEntries) {
                    if(participantEntry.matched){
                        //participant is matched already
                    }
                    else{
                        //if this participant p1 not matched yet, go on
                        //find participant p2 with different userId, same time and matched:False (participantDao or memory?)
                        //let foundMatch = false;
                        for (let otherParticipantEntry of allParticipantEntries){
                            if(!otherParticipantEntry.matched && otherParticipantEntry.userId != participantEntry.userId && otherParticipantEntry.time == participantEntry.time){
                                //it's a match
                                //foundMatch = true;
                                //get a location
                                let locationOptions = ["Starbucks in Clough Commons", "Auntie Ann's in Student Center", "Subway in Student Center", "Blue Donkey in Student Center", "Panda Express in Student Center", "Burdell's in Student Center", "Chick-fil-A in Student Center"];
                                let randomNumber = Math.floor(Math.random() * (locationOptions.length - 1));

                                let location = locationOptions[randomNumber];
                                //create new match entry with date, time, p1, p2 and location (matchDao)
                                DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, participantEntry, otherParticipantEntry, location);
                                DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, otherParticipantEntry, participantEntry, location);
                                //set p1.matched:True, p2.matched:True (participantDao or memory?)
                                participantEntry.matched = true;
                                otherParticipantEntry.matched = true;
                                let mailOptionsParticipant = {
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

                                let mailOptionsOtherParticipant = {
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
                DatabaseSingleton.Instance.participantDao.updateAllParticipants(allParticipantEntries);
                return "Matching process was successful, let's hope they'll all have a great time!";
            }
            else{
                return "There are no participants for today, do more user acquisition.";
            }
        });
    }

    storePictureURLParticipant(userId: String, fileLocation: String) {
        return DatabaseSingleton.Instance.participantDao.updateParticipantPictureURL(userId, fileLocation);
    }

    getPictureURLParticipant(userId: String) {
        return DatabaseSingleton.Instance.participantDao.getParticipantPictureURL(userId);
    }

    storePictureStringParticipant(userId: String, pictureString: String) {
        return DatabaseSingleton.Instance.participantDao.updateParticipantPictureString(userId, pictureString);
    }

    getPictureStringParticipant(userId: String) {
        return DatabaseSingleton.Instance.participantDao.getParticipantPictureString(userId);
    }

////Helper functions
    hashPassword(password: string) {
        let hash = 0, i, chr;
        if (password.length === 0) return hash;
        for (i = 0; i < password.length; i++) {
            chr   = password.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
