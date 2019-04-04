"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// APP-IMPORTS ======
var base_dao_1 = require("../../interfaces/base.dao");
// SCHEMA
var User_dao = /** @class */ (function (_super) {
    __extends(User_dao, _super);
    function User_dao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_dao.prototype.getUser = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); });
    };
    User_dao.prototype.updateUser = function (userToken, userId, passwordHash, userName, userInfo) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            userId: userId
        }, { $set: { userToken: userToken,
                userId: userId,
                passwordHash: passwordHash,
                userName: userName,
                userInfo: userInfo
            } }, { upsert: true } /*,
        function (err, documents) {
            return { error: err, affected: documents };
        },
        {returnOriginal: false}*/); });
    };
    User_dao.prototype.updateUserInfo = function (userId, userInfo) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            userId: userId
        }, { $set: { userInfo: userInfo } }, { upsert: true } /*,
        function (err, documents) {
            return { error: err, affected: documents };
        },
        {returnOriginal: false}*/); });
    };
    User_dao.prototype.getUserInfo = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (userEntry) {
            return userEntry.userInfo;
        });
    };
    User_dao.prototype.updateUserPictureURL = function (userId, fileLocation) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            userId: userId
        }, { $set: { pictureURL: fileLocation } }, { upsert: true } /*,
        function (err, documents) {
            return { error: err, affected: documents };
        },
        {returnOriginal: false}*/); });
    };
    User_dao.prototype.getUserPictureURL = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (userEntry) {
            return userEntry.pictureURL;
        });
    };
    User_dao.prototype.updateUserPictureString = function (userId, pictureString) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            userId: userId
        }, { $set: { pictureString: pictureString } }, { upsert: true } /*,
        function (err, documents) {
            return { error: err, affected: documents };
        },
        {returnOriginal: false}*/); });
    };
    User_dao.prototype.getUserPictureString = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (userEntry) {
            return userEntry.pictureString;
        });
    };
    User_dao.prototype.getUserPasswordHash = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (userEntry) {
            return userEntry.passwordHash;
        });
    };
    User_dao.prototype.getSchemaName = function () {
        //return process.env.MongoDbCollectionAccount;
        return "UserSchema";
    };
    return User_dao;
}(base_dao_1.BaseDao));
exports.User_dao = User_dao;
