// APP-IMPORTS ======
import {BaseDao} from "../../interfaces/base.dao";
import {CommonInterfaces} from "../../interfaces/commonInterfaces";
import IAccount = CommonInterfaces.IAccount;

// SCHEMA
export class Participant_dao extends BaseDao<IAccount>{

    getParticipant(userId: any, date: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId, date: date}));
    }

    updateParticipant(userToken: any, userId: any, userName: any, date: any, time: any, matched: boolean) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                userId: userId,
                date: date
            },
            { $set: { userToken: userToken,
                    userId: userId,
                    userName: userName,
                    date: date,
                    time: time,
                    matched: matched} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    getAllParticipants(date: any) {
        return this.execute((dbModel) => dbModel.find({date: date}));
    }

    updateAllParticipants(allParticipantEntries: any) {
        for (let participantEntry of allParticipantEntries) {
            this.updateParticipant(participantEntry.userToken, participantEntry.userId, participantEntry.userName, participantEntry.date, participantEntry.time, participantEntry.matched);
        }
        return "All participants are updated, yeehaw!";
    }


    getSchemaName(): string {
        //return process.env.MongoDbCollectionAccount;
        return "ParticipantSchema";
    }



    /*createNewUser(spotifyId) {
        let uriUserData = "http://35.231.156.227/feedme/get_user_data/?spotify_id="+spotifyId;
        const userDataParams = {
            "uri": uriUserData
        };
        return userData(userDataParams).then((userData) => {
            //console.log("user dao create new user ", userData);
            let newUserId = generateId(10); //id of length 10
            let hubObject = {
                hubRange: 10,
                anchorGenre: "pop",
                location: "",
                playlistHref: "",
                playlistId: "",
                playlistUri: "",
                name: "You & UbiTune"
            };
            let userDataToEnter = JSON.parse(userData["response"]);
            userDataToEnter.userId = newUserId;
            userDataToEnter.hubSettings = hubObject;
            //console.log("user dao create new user userDataToEnter ", userDataToEnter);
            return this.execute((dbModel) => dbModel.insertMany(
                userDataToEnter
            ));
        });
    }

    updateUserEntry(spotifyId) {
        let uriUserData = "http://35.231.156.227/feedme/get_user_data/?spotify_id="+spotifyId;
        const userDataParams = {
            "uri": uriUserData
        };
        return userData(userDataParams).then((userData) => {
            let userDataToEnter = JSON.parse(userData["response"]);
            return this.execute((dbModel) => dbModel.findOneAndUpdate({
                    spotify_id: spotifyId
                },
                { $set: userDataToEnter },
                { upsert: true },
                function (err, documents) {
                    return { error: err, affected: documents };
                },
                {returnOriginal: false}
            ));
        });

    }

    getHubSettings(spotifyId: any) {
        return this.execute((dbModel) => dbModel.findOne({spotify_id: spotifyId})).then( (userEntry) => {
            return userEntry.hubSettings;
        });
    }

    setHubRange(spotifyId, newHubRange) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                spotify_id: spotifyId
            },
            { $set: { "hubSettings.hubRange":  newHubRange} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    setAnchorGenre(spotifyId, newAnchorGenre) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                spotify_id: spotifyId
            },
            { $set: { "hubSettings.anchorGenre":  newAnchorGenre} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    setHubSettings(spotifyId: any, hubSettings: any) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                spotify_id: spotifyId
            },
            { $set: { hubSettings:  hubSettings} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));

    }

    setHubName(spotifyId: any, hubName: any) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                spotify_id: spotifyId
            },
            { $set: { "hubSettings.name":  hubName} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    getSpotifyInfo(spotifyId) {
        return this.execute((dbModel) => dbModel.findOne({spotify_id: spotifyId})).then( (userEntry) => {
            return {spotifyToken: userEntry.access_token, spotifyId: userEntry.spotify_id}; //returns spotify token and spotify id for user
        });
    }

    getUserEntry(spotifyId) {
        return this.execute((dbModel) => dbModel.findOne({spotify_id: spotifyId})).then( (userEntry) => {
            return userEntry; //returns entry for user
        });
    }*/

}
