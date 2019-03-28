// APP-IMPORTS ======
import {BaseDao} from "../../interfaces/base.dao";
import {CommonInterfaces} from "../../interfaces/commonInterfaces";
import IAccount = CommonInterfaces.IAccount;

// SCHEMA
export class User_dao extends BaseDao<IAccount>{

    getUser(userId: any, date: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId}));
    }

    updateUser(userToken: any, userId: any, userName: any, userInfo: any) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                userId: userId
            },
            { $set: { userToken: userToken,
                    userId: userId,
                    userName: userName,
                    userInfo: userInfo
                    } },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    updateUserInfo(userId: any, userInfo: any) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                userId: userId
            },
            { $set: {userInfo: userInfo } },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    getUserInfo(userId: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId})).then((userEntry) => {
            return userEntry.userInfo;
        });
    }

    updateUserPictureURL(userId: String, fileLocation: String) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                userId: userId
            },
            { $set: { pictureURL: fileLocation} },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    getUserPictureURL(userId: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId})).then((userEntry) => {
            return userEntry.pictureURL;
        });
    }

    updateUserPictureString(userId: String, pictureString: String) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                userId: userId
            },
            { $set: { pictureString: pictureString} },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    getUserPictureString(userId: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId})).then((participantEntry) => {
            return participantEntry.pictureString;
        });
    }

    getSchemaName(): string {
        //return process.env.MongoDbCollectionAccount;
        return "UserSchema";
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
