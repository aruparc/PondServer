"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * Schema of a User (account)
 * @type {"mongoose".Schema}
 */
exports.user_schema = new mongoose_1.Schema({
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
