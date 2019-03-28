import {Schema} from "mongoose";

/**
 * Schema of a hub
 * @type {"mongoose".Schema}
 */
export const match_schema: Schema = new Schema({
    date: Date,
    time: Number,
    p1: String,
    p2: String,
    location: String,
    p1Name: String,
    p2Name: String,
    p2ArrivalStatus: String
}, {
    //collection: process.env.MongoDbCollectionAccount,
    collection: "MatchSchema",
    strict: false
    //timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
