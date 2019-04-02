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
        return this.execute((dbModel) => dbModel.findOne({userId: userId})).then((userEntry) => {
            return userEntry.pictureString;
        });
    }

    getUserPasswordHash(userId: any) {
        return this.execute((dbModel) => dbModel.findOne({userId: userId})).then((userEntry) => {
            return userEntry.passwordHash;
        });
    }

    getSchemaName(): string {
        //return process.env.MongoDbCollectionAccount;
        return "UserSchema";
    }
}
