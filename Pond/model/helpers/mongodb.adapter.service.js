"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbAdapterService = /** @class */ (function () {
    function MongoDbAdapterService(mongoConnection) {
        this.mongoConnection = mongoConnection;
    }
    // CLASS METHODS ======
    MongoDbAdapterService.prototype.defineModel = function (modelName, schema) {
        var _this = this;
        return this.mongoConnection.connection.then(function () {
            return _this.mongoConnection.connection.model(modelName, schema, modelName);
        });
    };
    return MongoDbAdapterService;
}());
exports.MongoDbAdapterService = MongoDbAdapterService;
