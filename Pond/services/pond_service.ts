import {DatabaseSingleton} from "../config/database";
import {CommonInterfaces} from "../interfaces/commonInterfaces";

export class PondService {

    constructor() {
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
                                let location = "Starbucks in Clough Commons";
                                //create new match entry with date, time, p1, p2 and location (matchDao)
                                DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, participantEntry, otherParticipantEntry, location);
                                DatabaseSingleton.Instance.matchDao.createMatch(date, participantEntry.time, otherParticipantEntry, participantEntry, location);
                                //set p1.matched:True, p2.matched:True (participantDao or memory?)
                                participantEntry.matched = true;
                                otherParticipantEntry.matched = true;
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


    storePictureURL(userId: String, fileLocation: String) {
        return DatabaseSingleton.Instance.participantDao.updateParticipantPictureURL(userId, fileLocation);
    }

    getPictureURL(userId: String) {
        return DatabaseSingleton.Instance.participantDao.getParticipantPictureURL(userId);
    }

    storePictureString(userId: String, pictureString: String) {
        return DatabaseSingleton.Instance.participantDao.updateParticipantPictureString(userId, pictureString);
    }

    getPictureString(userId: String) {
        return DatabaseSingleton.Instance.participantDao.getParticipantPictureString(userId);
    }



    //persistent storage: general user data (and statistics)
    //live database: currently active hubs and their connected users (dictionary userId -> hubId & hub objects: location, list of influencers, playlist)

    /*storeUserData(spotifyId) {
        return DatabaseSingleton.Instance.userDao.getUserEntry(spotifyId).then((userEntry) => {
            if(userEntry){
                //update user data in persistent storage for userId
                //return confirmation
                return DatabaseSingleton.Instance.userDao.updateUserEntry(spotifyId);
            }
            else{
                //if user does not exist create user in persistent storage
                //get user data from support server
                //generate userId (from mongoDb) and store user data
                //return confirmation
                return DatabaseSingleton.Instance.userDao.createNewUser(spotifyId);
            }
        });
    }

    /!*getNearbyHubs(spotifyId, currentUserLocation: any) {
        //TODO: batch updates of user locations
        //send user location to location server: update_user_location
        let uriUserLocation = "http://35.231.156.227/feedme/update_user_locations/";
        let jsonData = {
            "spotify_id": spotifyId,
            "userLocation": currentUserLocation
        };
        const userLocationParams = {
            "uri": uriUserLocation,
            "jsonData": jsonData
        };
        updateUserLocation(userLocationParams);
        //look into live database
        // for currentUserLocation find closest 3 hubs
        // assembles hubs as list for return object (1 hub is marked as active)
        return DatabaseSingleton.Instance.hubDao.getNearbyHubs(spotifyId).then(async (closeHubs) => {
            if(closeHubs.length > 0){
                //prevent duplicate entries into list of influencers for a hub by checking whether this user already is assigned to the hub
                let currentAssignedHub = await DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId);
                if(currentAssignedHub != closeHubs[0].hubId){
                    // assign user to closest hub (update live database) (if user is in hub's range)
                    DatabaseSingleton.Instance.hubDao.assignUserToHub(spotifyId, closeHubs[0].hubId).then((hub) => {
                        //trigger user's influence on hub's playlist (live database)
                        //DatabaseSingleton.Instance.hubDao.influencePlaylist(userId);
                        /!*DatabaseSingleton.Instance.hubDao.getAssignedHub(userId).then((hubId) => {
                            this.spotifyClient.putUserSongIntoHubPlaylist(userId, hubId);
                        });*!/
                        DatabaseSingleton.Instance.userToHubDao.assignUserToHub(spotifyId, closeHubs[0].hubId);
                        DatabaseSingleton.Instance.userDao.getSpotifyInfo(closeHubs[0].hubId).then((hubSpotifyInfo) => {
                            DatabaseSingleton.Instance.userDao.getUserEntry(spotifyId).then((userEntry) => {
                                //console.log("service get nearby hubs userEntry ", userEntry);
                                this.spotifyClient.putUserSongIntoHubPlaylist(userEntry, hubSpotifyInfo);
                            });
                        });
                    });
                }
            }
            //return list of hubs
            //console.log("service get nearby hubs closeHubs", closeHubs);
            let closestSongResponse;
            let hubName;
            let hubsToReturn = [];
            for (let closeHub of closeHubs) {
                closestSongResponse = await this.spotifyClient.getCurrentSong(closeHub.hubId);
                closestSongResponse = closestSongResponse["response"];
                  hubName = await DatabaseSingleton.Instance.hubDao.getHubInfo(closeHub.hubId);
                //hubName = await DatabaseSingleton.Instance.userDao.getUserEntry(closeHub.hubId);
                if(hubName){
                    hubName = hubName["hubSettings"]["name"];
                }
                else{
                    hubName = "You & UbiTune";
                }

                //console.log("service get nearby hubs closestSongResponse", closestSongResponse["item"]);
                if(closestSongResponse === ""){
                    closeHub["album"] = "none";
                    closeHub["albumCoverURL"] = "none";
                    closeHub["artist"] = "none";
                    closeHub["song"] = "none";
                    closeHub["hubName"] = hubName;
                    hubsToReturn.push(closeHub);
                }
                else{
                    closestSongResponse = JSON.parse(closestSongResponse);
                    closeHub["album"] = closestSongResponse["item"]["album"]["name"];
                    closeHub["albumCoverURL"] = closestSongResponse["item"]["album"]["images"][2]["url"];
                    closeHub["artist"] = closestSongResponse["item"]["artists"][0]["name"];
                    closeHub["song"] = closestSongResponse["item"]["name"];
                    closeHub["hubName"] = hubName;
                    hubsToReturn.push(closeHub);
                }
                //console.log("service get nearby hubs loop", closeHub);
            }
            return hubsToReturn;
        });
    }

    getSongPlaying(spotifyId: number) {
        //userId look up influencing hub (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            return DatabaseSingleton.Instance.userDao.getSpotifyInfo(hubId).then((hubSpotifyToken) => {
                //hubId: read current song (live database)
                // return current song
                return this.spotifyClient.getCurrentSong(hubId);
            });
        });
    }

    getCurrentPlaylist(spotifyId: number) {
        //userId look up influencing hub (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            return DatabaseSingleton.Instance.userDao.getSpotifyInfo(hubId).then((hubSpotifyToken) => {
                //hubId: read current playlist (live database)
                // return current playlist
                return this.spotifyClient.getCurrentPlaylist(hubId);
            });
        });
    }

    activateHub(spotifyId, hubLocation) {
        //userId: look up entry in persistent storage
        //take last hub settings (note: if first time hub default settings are in persistent storage)
        return DatabaseSingleton.Instance.userDao.getHubSettings(spotifyId).then((hubSettings) => {
            //send new hub to location server: post create_hub
            //let uriCreateHub = "http://35.231.156.227/feedme/create_hub/?spotify_id="+spotifyId;
            let uriCreateHub = "http://35.231.156.227/feedme/create_hub/";
            let jsonData = {};
            jsonData["hubLocation"] = hubLocation;
            jsonData["hubRange"] = hubSettings.hubRange;
            jsonData["spotify_id"] = spotifyId;
            const createHubParams = {
                "uri": uriCreateHub,
                "jsonData": jsonData
            };
            createHub(createHubParams);

            //update hubLocation
            hubSettings.location = hubLocation;
            //create hub object in active hubs list with settings and hubLocation (live database)
            return DatabaseSingleton.Instance.hubDao.activateHub(spotifyId, hubSettings).then((activatedHub) => {
                //userId update influencing hub (own userId, i.e. userId -> userId) (live database)
                DatabaseSingleton.Instance.hubDao.assignUserToHub(spotifyId, spotifyId);
                DatabaseSingleton.Instance.userToHubDao.assignUserToHub(spotifyId, spotifyId);
                // trigger user's influence on created hub's playlist (live database)
                return DatabaseSingleton.Instance.userDao.getSpotifyInfo(spotifyId).then((spotifyInfo) => {
                    //console.log("activateHub service ", spotifyInfo);
                    this.spotifyClient.createPlaylist(spotifyId, spotifyInfo, hubSettings.anchorGenre);
                    //return confirmation
                    //console.log("activateHub service ", hubSettings);
                    return hubSettings;
                });
            });
        });
    }

    deactivateHub(spotifyId) {
        //send deleted hub to location server
        let uriDeleteHub = "http://35.231.156.227/feedme/delete_hub/";
        let jsonData = {
            "spotify_id": spotifyId
        };
        const deleteHubParams = {
            "uri": uriDeleteHub,
            "jsonData": jsonData
        };
        deleteHub(deleteHubParams);
        //userId: look up associated hub in hub list (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            if(spotifyId != hubId){
                return Promise.reject("You do not have an active hub to deactivate. Become a hub first.");
            }
            else{
                //delete hub from active hub list (live database)
                DatabaseSingleton.Instance.userToHubDao.removeAssignedHub(spotifyId);
                //http://2ality.com/2014/06/es6-multiple-return-values.html
                return DatabaseSingleton.Instance.hubDao.deactivateHub(hubId).then((deactivatedHubDocument) => {
                    //console.log("deactivateHub service ", deactivatedHubDocument);
                    //store hub settings (and other data) in persistent storage for userId
                    DatabaseSingleton.Instance.userDao.setHubSettings(spotifyId, deactivatedHubDocument["hubSettings"]);
                    //call getNearbyHubs for each influencing user in deactivated hub's list of influencers (note: this includes userId)
                    deactivatedHubDocument["listOfInfluencers"].forEach(function(influencerId){
                        DatabaseSingleton.Instance.userToHubDao.removeAssignedHub(influencerId);
                        this.getNearbyHubs(influencerId, deactivatedHubDocument["hubSettings"].location);
                    }, this);
                    //return confirmation
                    return this.getNearbyHubs(spotifyId, deactivatedHubDocument["hubSettings"].location);
                });
            }
        });
    }

    changeActiveHub(spotifyId, newHubId) {
        // update userId's influencing hub (live database) (note: only possible if not associated to own userId, i.e. own hub)
        // old hubId: take userId off list of influencers
        // new hubId (parameter): put userId on list of influencers
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            if(spotifyId === hubId){
                //user is currently hosting a hub -> reject
                return Promise.reject("You are currently hosting a hub yourself. Deactivate your hub first and then select the hub you want to influence.");
            }
            else{
                DatabaseSingleton.Instance.userToHubDao.removeAssignedHub(spotifyId);
                DatabaseSingleton.Instance.hubDao.assignUserToHub(spotifyId, newHubId).then( (hub) => {
                    DatabaseSingleton.Instance.hubDao.removeUserFromHub(spotifyId, hubId);
                    //trigger user's influence on hub's playlist (live database)
                    //DatabaseSingleton.Instance.hubDao.influencePlaylist(userId);
                    DatabaseSingleton.Instance.userToHubDao.assignUserToHub(spotifyId, newHubId);
                    this.spotifyClient.putUserSongIntoHubPlaylist(spotifyId, newHubId);
                });
                //return confirmation
                return newHubId;
            }
        });
    }

    setHubRange(spotifyId, hubRange: number) {
        //TODO: send new range to location server
        //userId: look up associated hub (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            console.log("setHubRange service ");
            if(spotifyId === hubId){
                //if associated to own userId (i.e. is hub) update range value for this hub in active hubs list (live database)
                //return confirmation
                return DatabaseSingleton.Instance.hubDao.setHubRange(hubId, hubRange);
            }
            else{

                //if associated to another hub update range value for hub in persistent storage
                //return confirmation
                return DatabaseSingleton.Instance.userDao.setHubRange(spotifyId, hubRange);
            }
        });
    }

    setHubAnchorGenre(spotifyId, genre: any) {
        //userId: look up associated hub (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            if(spotifyId === hubId){
                //if associated to own userId (i.e. is hub) update anchor genre value for this hub in active hubs list (live database)
                //update playlist according to new anchor genre value (live database)
                //return confirmation
                DatabaseSingleton.Instance.hubDao.setAnchorGenre(hubId, genre);
                return this.spotifyClient.updatePlaylist(spotifyId, genre);
            }
            else{
                //if associated to another hub update anchor genre value for hub in persistent storage
                //return confirmation
                return DatabaseSingleton.Instance.userDao.setAnchorGenre(spotifyId, genre);
            }
        });
    }

    setHubName(spotifyId, hubName: any) {
        //userId: look up associated hub (live database)
        return DatabaseSingleton.Instance.userToHubDao.getAssignedHub(spotifyId).then((hubId) => {
            if(spotifyId === hubId){
                //console.log("service set hub name if hubName ", hubName);
                //if associated to own userId (i.e. is hub) update hub name for this hub in active hubs list (live database)
                //return confirmation
                return DatabaseSingleton.Instance.hubDao.setHubName(hubId, hubName);
            }
            else{
                //console.log("service set hub name else hubName ", hubName);
                //if associated to another hub update hub name for hub in persistent storage
                //return confirmation
                return DatabaseSingleton.Instance.userDao.setHubName(spotifyId, hubName);
            }
        });
    }*!/*/
}
