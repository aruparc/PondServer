"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * Schema of a User (account)
 * @type {"mongoose".Schema}
 */
exports.participant_schema = new mongoose_1.Schema({
    userToken: String,
    userId: String,
    userName: String,
    date: Date,
    time: Number,
    matched: Boolean,
    //profilepic: String //profile pic will be stored as a binary string?
}, {
    //collection: process.env.MongoDbCollectionAccount,
    collection: "ParticipantSchema"
    //timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
