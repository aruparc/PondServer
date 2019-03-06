//https://stackoverflow.com/questions/40365007/node-js-and-mongodb-app-on-aws
//https://www.quora.com/How-can-I-deploy-my-node-js-MongoDB-app-on-AWS
//https://medium.com/@sunilmore/complete-setup-for-deploying-nodejs-app-with-mongodb-database-on-amazon-ec2-e6eeb3b47bc0

import {MongoConnection} from "../model/helpers/mongo.connection";
import {CommonInterfaces} from "../interfaces/commonInterfaces";
import IMongoDBConnectionConfig = CommonInterfaces.IMongoDBConnectionConfig;

import { Participant_dao } from "../model/dao/participant_dao";
import {Match_dao} from "../model/dao/match_dao";

import {participant_schema} from "../model/schema/participant_schema";
import {match_schema} from "../model/schema/match_schema";

export class DatabaseSingleton {

    private static _instance: DatabaseSingleton;

    private _participantDao: Participant_dao;
    private _matchDao: Match_dao;

    private _mongoConnection:MongoConnection;

    private mongoDbUserDataConfig:IMongoDBConnectionConfig = {
        //connection: process.env.MongoDbConnection,
        //database: process.env.MongoDbDatabase,
       // connection: "mongodb://localhost:27017",
        connection: "mongodb+srv://admin:1QIM04sMtPrtMy27@pondcluster-hhnhn.gcp.mongodb.net",
        database: "pond-dev",
        useSsl: false
    };

    private constructor() {
    }

    setup() {
        //console.log("!!!!!!!!!!!!!!this.mongoDbUserDataConfig ", this.mongoDbUserDataConfig);
        this._mongoConnection = new MongoConnection(this.mongoDbUserDataConfig);
        this._mongoConnection.connect();
        console.log("_mongoConnection ", this._mongoConnection);

        this._participantDao = new Participant_dao(this._mongoConnection, participant_schema);
        this._matchDao = new Match_dao(this._mongoConnection, match_schema);

    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    get participantDao(): Participant_dao {
        return this._participantDao;
    }

    get matchDao(): Match_dao {
        return this._matchDao;
    }

}




