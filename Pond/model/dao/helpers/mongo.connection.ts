import {CommonInterfaces} from "../../../interfaces/commonInterfaces";
import IMongoDBConnectionConfig = CommonInterfaces.IMongoDBConnectionConfig;
import * as mongoose from 'mongoose';


export class MongoConnection {
    private mongoConfig: IMongoDBConnectionConfig;
    private _connection;
    private delay = function (t, v?) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    };

    constructor(mongoConfig: IMongoDBConnectionConfig) {
        // the first spawning instance will connect to the cosmos-db
        this.mongoConfig = mongoConfig;
    }

    public connect() {
        const connectString = `${this.mongoConfig.connection}/${this.mongoConfig.database}?ssl=${this.mongoConfig.useSsl}`;

        const connectWithRetry = () => {
            this._connection = mongoose.connect(connectString)
                .then((connectedConnection) => {
                    console.log('MONGO DB IS CONNECTED');
                    this._connection = connectedConnection;
                })
                .catch((connectionError) => {
                    console.error('ERROR CONNECTING TO MONGO DB', connectionError);
                    console.log('WILL TRY AGAIN in 3 secs.');
                    return this.delay(3000).then(() => {
                        return connectWithRetry();
                    });
                });

            return this._connection;
        };

        return connectWithRetry();
    }


    get connection() {
        return this._connection;
    }
}
