"use strict";
//https://stackoverflow.com/questions/40365007/node-js-and-mongodb-app-on-aws
//https://www.quora.com/How-can-I-deploy-my-node-js-MongoDB-app-on-AWS
//https://medium.com/@sunilmore/complete-setup-for-deploying-nodejs-app-with-mongodb-database-on-amazon-ec2-e6eeb3b47bc0
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_connection_1 = require("../model/helpers/mongo.connection");
var participant_dao_1 = require("../model/dao/participant_dao");
var match_dao_1 = require("../model/dao/match_dao");
var participant_schema_1 = require("../model/schema/participant_schema");
var match_schema_1 = require("../model/schema/match_schema");
var DatabaseSingleton = /** @class */ (function () {
    function DatabaseSingleton() {
        this.mongoDbUserDataConfig = {
            //connection: process.env.MongoDbConnection,
            //database: process.env.MongoDbDatabase,
            // connection: "mongodb://localhost:27017",
            connection: "mongodb+srv://admin:1QIM04sMtPrtMy27@pondcluster-hhnhn.gcp.mongodb.net",
            database: "pond-dev",
            useSsl: false
        };
    }
    DatabaseSingleton.prototype.setup = function () {
        //console.log("!!!!!!!!!!!!!!this.mongoDbUserDataConfig ", this.mongoDbUserDataConfig);
        this._mongoConnection = new mongo_connection_1.MongoConnection(this.mongoDbUserDataConfig);
        this._mongoConnection.connect();
        console.log("_mongoConnection ", this._mongoConnection);
        this._participantDao = new participant_dao_1.Participant_dao(this._mongoConnection, participant_schema_1.participant_schema);
        this._matchDao = new match_dao_1.Match_dao(this._mongoConnection, match_schema_1.match_schema);
    };
    Object.defineProperty(DatabaseSingleton, "Instance", {
        get: function () {
            // Do you need arguments? Make it a regular method instead.
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatabaseSingleton.prototype, "participantDao", {
        get: function () {
            return this._participantDao;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatabaseSingleton.prototype, "matchDao", {
        get: function () {
            return this._matchDao;
        },
        enumerable: true,
        configurable: true
    });
    return DatabaseSingleton;
}());
exports.DatabaseSingleton = DatabaseSingleton;
