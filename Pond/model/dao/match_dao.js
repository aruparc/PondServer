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
var Match_dao = /** @class */ (function (_super) {
    __extends(Match_dao, _super);
    function Match_dao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Match_dao.prototype.getMatch = function (userId, date) {
        return this.execute(function (dbModel) { return dbModel.findOne({ p1: userId, date: date }); });
    };
    Match_dao.prototype.createMatch = function (date, time, participantEntry, otherParticipantEntry, location) {
        return this.execute(function (dbModel) { return dbModel.findOneAndUpdate({
            date: date,
            p1: participantEntry.userId
        }, { $set: { date: date,
                time: time,
                p1: participantEntry.userId,
                p2: otherParticipantEntry.userId,
                location: location,
                p1Name: participantEntry.userName,
                p2Name: otherParticipantEntry.userName } }, { upsert: true } /*,
        function (err, documents) {
            return { error: err, affected: documents };
        },
        {returnOriginal: false}*/); });
    };
    Match_dao.prototype.getSchemaName = function () {
        //return process.env.MongoDbCollectionAccount;
        return "MatchSchema";
    };
    return Match_dao;
}(base_dao_1.BaseDao));
exports.Match_dao = Match_dao;
