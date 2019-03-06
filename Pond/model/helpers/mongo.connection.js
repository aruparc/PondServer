"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var MongoConnection = /** @class */ (function () {
    function MongoConnection(mongoConfig) {
        this.delay = function (t, v) {
            return new Promise(function (resolve) {
                setTimeout(resolve.bind(null, v), t);
            });
        };
        // the first spawning instance will connect to the cosmos-db
        this.mongoConfig = mongoConfig;
    }
    MongoConnection.prototype.connect = function () {
        var _this = this;
        var connectString = this.mongoConfig.connection + "/" + this.mongoConfig.database + "?ssl=true&replicaSet=PondCluster-shard-0&authSource=admin&retryWrites=true";
        var connectWithRetry = function () {
            _this._connection = mongoose.connect(connectString, { useNewUrlParser: true })
                .then(function (connectedConnection) {
                console.log('MONGO DB IS CONNECTED');
                _this._connection = connectedConnection;
            })
                .catch(function (connectionError) {
                console.error('ERROR CONNECTING TO MONGO DB', connectionError);
                console.log('WILL TRY AGAIN in 3 secs.');
                return _this.delay(3000).then(function () {
                    return connectWithRetry();
                });
            });
            return _this._connection;
        };
        return connectWithRetry();
    };
    Object.defineProperty(MongoConnection.prototype, "connection", {
        get: function () {
            return this._connection;
        },
        enumerable: true,
        configurable: true
    });
    return MongoConnection;
}());
exports.MongoConnection = MongoConnection;
