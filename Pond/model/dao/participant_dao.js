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
var Participant_dao = /** @class */ (function (_super) {
    __extends(Participant_dao, _super);
    function Participant_dao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Participant_dao.prototype.getParticipant = function (userId, date) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId, date: date }); });
    };
    Participant_dao.prototype.updateParticipant = function (userToken, userId, userName, date, time, matched) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            userId: userId,
            date: date
        }, { $set: { userToken: userToken,
                userId: userId,
                userName: userName,
                date: date,
                time: time,
                matched: matched } }, { upsert: true }, function (err, documents) {
            return { error: err, affected: documents };
        }, { returnOriginal: false }); });
    };
    Participant_dao.prototype.updateParticipantPictureURL = function (userId, fileLocation) {
        return this.execute(function (dbModel) { return dbModel.updateMany({
            userId: userId
        }, { $set: { pictureURL: fileLocation } }, { upsert: true }, function (err, documents) {
            return { error: err, affected: documents };
        }, { returnOriginal: false }); });
    };
    Participant_dao.prototype.getParticipantPictureURL = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (participantEntry) {
            return participantEntry.pictureURL;
        });
    };
    Participant_dao.prototype.updateParticipantPictureString = function (userId, pictureString) {
        return this.execute(function (dbModel) { return dbModel.updateMany({
            userId: userId
        }, { $set: { pictureString: pictureString } }, { upsert: true }, function (err, documents) {
            return { error: err, affected: documents };
        }, { returnOriginal: false }); });
    };
    Participant_dao.prototype.getParticipantPictureString = function (userId) {
        return this.execute(function (dbModel) { return dbModel.findOne({ userId: userId }); }).then(function (participantEntry) {
            return participantEntry.pictureString;
        });
    };
    Participant_dao.prototype.getAllParticipants = function (date) {
        return this.execute(function (dbModel) { return dbModel.find({ date: date }); });
    };
    Participant_dao.prototype.updateAllParticipants = function (allParticipantEntries) {
        for (var _i = 0, allParticipantEntries_1 = allParticipantEntries; _i < allParticipantEntries_1.length; _i++) {
            var participantEntry = allParticipantEntries_1[_i];
            this.updateParticipant(participantEntry.userToken, participantEntry.userId, participantEntry.userName, participantEntry.date, participantEntry.time, participantEntry.matched);
        }
        return "All participants are updated, yeehaw!";
    };
    Participant_dao.prototype.getSchemaName = function () {
        //return process.env.MongoDbCollectionAccount;
        return "ParticipantSchema";
    };
    return Participant_dao;
}(base_dao_1.BaseDao));
exports.Participant_dao = Participant_dao;
