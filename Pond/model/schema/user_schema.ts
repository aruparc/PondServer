import {Schema} from "mongoose";

/**
 * Schema of a User (account)
 * @type {"mongoose".Schema}
 */
export const user_schema: Schema = new Schema({
    userToken: String,
    userId: String,
    userName: String,
    userInfo: String,
    pictureURL: String,
    pictureString: String
}, {
    //collection: process.env.MongoDbCollectionAccount,
    collection: "UserSchema",
    strict: false
    //timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
