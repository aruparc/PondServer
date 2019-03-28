// APP-IMPORTS ======
import {BaseDao} from "../../interfaces/base.dao";
import {CommonInterfaces} from "../../interfaces/commonInterfaces";
import IHub = CommonInterfaces.IHub;

// SCHEMA
export class Match_dao extends BaseDao<IHub>{

    getMatch(userId: any, date: any) {
        return this.execute((dbModel) => dbModel.findOne({p1: userId, date: date}));
    }

    createMatch(date: any, time: any, participantEntry, otherParticipantEntry, location: string) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                date: date,
                p1: participantEntry.userId
            },
            { $set: { date: date,
                    time: time,
                    p1: participantEntry.userId,
                    p2: otherParticipantEntry.userId,
                    location: location,
                    p1Name: participantEntry.userName,
                    p2Name: otherParticipantEntry.userName,
                    p2ArrivalStatus: "On the Way to Meeting You!"} },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    updateMatchStatus(userId: any, date: any, status: string) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                p2: userId,
                date: date
            },
            { $set: { p2ArrivalStatus: status} },
            { upsert: true }/*,
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}*/
        ));
    }

    getSchemaName(): string {
        //return process.env.MongoDbCollectionAccount;
        return "MatchSchema";
    }


/*
    getNearbyHubs(spotifyId) {
        //returns list of (up to) three closest hubs
        let uriGetHub = "http://35.231.156.227/feedme/get_hub/?spotify_id="+spotifyId;
        const getHubParams = {
            "uri": uriGetHub
        };
        return getHub(getHubParams).then((responseListOfHubs) => {
            console.log("hub dao get nearby hubs responseListOfHubs ", responseListOfHubs);
            let nearbyHubsToReturn = [
                {
                    "active": true,
                    "album": "The Human Condition",
                    "albumCoverURL": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/The_Human_Condition_%28Official_Album_Cover%29_by_Jon_Bellion.png/220px-The_Human_Condition_%28Official_Album_Cover%29_by_Jon_Bellion.png",
                    "artist": "John Bellion",
                    "hubName": "Subway",
                    "song": "Overwhelming"
                },
                {
                    "active": false,
                    "album": "A Moment Apart",
                    "albumCoverURL": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/A_Moment_Alone_Cover.jpg/220px-A_Moment_Alone_Cover.jpg",
                    "artist": "ODESZA",
                    "hubName": "Caribou Coffee",
                    "song": "Late Night"
                }
            ];
            if (!responseListOfHubs) {
                return [];
            }
            else {
                //list of spotify ids for hubs
                let listOfHubs = JSON.parse(responseListOfHubs["response"]);
                listOfHubs = listOfHubs["user_list"];

                let hubsToReturn = [];
                let closestHubId;
                let closestHubObject;

                for (let i = 0; i < 3; i++){
                    if(listOfHubs[i]){
                        closestHubObject = {
                            "active": false,
                            "album": "",
                            "albumCoverURL": "",
                            "artist": "",
                            "song": "",
                            "hubName": "You & UbiTune",
                            "hubId": ""
                        };
                        closestHubObject["hubId"] = listOfHubs[i];
                        if(i === 0){
                            closestHubObject["active"] = true;
                        }
                        hubsToReturn.push(closestHubObject);
                    }
                }

                return hubsToReturn;
            }
        });
    }

    assignUserToHub(spotifyId: number, hubId: string) {
        return this.execute((dbModel) => dbModel.findOne({hubId: hubId})).then((hub) => {
            let listOfInfluencers = hub.listOfInfluencers;
            //need to explicitly cast versions to array (internal mongoose bug)
            listOfInfluencers = Array.from(listOfInfluencers);
            listOfInfluencers.push(spotifyId);

            return this.execute((dbModel) => dbModel.findOneAndUpdate(
                {hubId: hubId},
                {$set: {listOfInfluencers: listOfInfluencers}},
                {upsert: true},
                function (err, documents) {
                    return {error: err, affected: documents};
                },
                {returnOriginal: false}
            ));
        });
    }

    removeUserFromHub(spotifyId: any, hubId: any) {
        return this.execute((dbModel) => dbModel.findOne({hubId: hubId})).then((hub) => {
            let listOfInfluencers = hub.listOfInfluencers;
            //need to explicitly cast versions to array (internal mongoose bug)
            listOfInfluencers = Array.from(listOfInfluencers);
            listOfInfluencers.forEach((influencer, i: number) => {
                if(spotifyId === influencer){
                    //delete influencer from list
                    listOfInfluencers.splice(i, 1);
                }
            });

            return this.execute((dbModel) => dbModel.findOneAndUpdate(
                {hubId: hubId},
                {$set: {listOfInfluencers: listOfInfluencers}},
                {upsert: true},
                function (err, documents) {
                    return {error: err, affected: documents};
                },
                {returnOriginal: false}
            ));
        });
    }

    activateHub(hubId, hubSettings) {
        return this.execute((dbModel) => dbModel.insertMany({
            hubId: hubId,
            listOfInfluencers: [],
            hubSettings
        }));
    }

    async deactivateHub(hubId: any) {
        let hubDoc = await this.execute((dbModel) => dbModel.findOneAndUpdate({
                hubId: hubId
            },
            {$set: {}},
            {upsert: true},
            function (err, documents) {
                return {error: err, affected: documents};
            },
            {returnOriginal: false}
        ));

        this.execute( (dbModel) => dbModel.deleteOne({
            hubId: hubId,
            },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: true}));
        return hubDoc;
    }

    setHubRange(hubId: any, newHubRange) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                hubId: hubId
            },
            { $set: { "hubSettings.hubRange":  newHubRange} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    setAnchorGenre(hubId, newAnchorGenre) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                hubId: hubId
            },
            { $set: { "hubSettings.anchorGenre":  newAnchorGenre} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    setHubName(hubId: any, hubName: any) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                hubId: hubId
            },
            { $set: { "hubSettings.name":  hubName} },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    setPlaylistInfo(hubId, playlistHref, playlistId, playlistUri) {
        return this.execute((dbModel) => dbModel.findOneAndUpdate({
                hubId: hubId
            },
            { $set: {
                    "hubSettings.playlistHref":  playlistHref,
                    "hubSettings.playlistId":  playlistId,
                    "hubSettings.playlistUri": playlistUri
                } },
            { upsert: true },
            function (err, documents) {
                return { error: err, affected: documents };
            },
            {returnOriginal: false}
        ));
    }

    getHubInfo(hubId) {
        return this.execute((dbModel) => dbModel.findOne({
                hubId: hubId
            }
        ));
    }*/
}
