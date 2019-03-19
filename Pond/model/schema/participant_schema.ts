import {Schema} from "mongoose";

/**
 * Schema of a User (account)
 * @type {"mongoose".Schema}
 */
export const participant_schema: Schema = new Schema({
    userToken: String,
    userId: String,
    userName: String,
    date: Date,
    time: Number,
    pictureURL: String,
    matched: Boolean
}, {
    //collection: process.env.MongoDbCollectionAccount,
    collection: "ParticipantSchema"
    //timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
