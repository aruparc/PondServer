"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * Schema of a hub
 * @type {"mongoose".Schema}
 */
exports.match_schema = new mongoose_1.Schema({
    date: Date,
    time: Number,
    p1: String,
    p2: String,
    location: String,
    p1Name: String,
    p2Name: String,
    p1ArrivalStatus: String,
    p2ArrivalStatus: String
}, {
    //collection: process.env.MongoDbCollectionAccount,
    collection: "MatchSchema",
    strict: false
    //timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
});
