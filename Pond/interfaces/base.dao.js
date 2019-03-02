"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_adapter_service_1 = require("../model/helpers/mongodb.adapter.service");
var BaseDao = /** @class */ (function () {
    function BaseDao(mongoDbConfig, schema) {
        this.dbAdapterService = new mongodb_adapter_service_1.MongoDbAdapterService(mongoDbConfig);
        //console.log("############mongoDbConfig ", mongoDbConfig);
        //console.log("############getSchemaName ", this.getSchemaName());
        //console.log("############schema ", schema);
        this.DbModel = this.dbAdapterService.defineModel(this.getSchemaName(), schema);
    }
    BaseDao.prototype.getAll = function () {
        return this.execute(function (dbModel) { return dbModel.find({}); });
    };
    BaseDao.prototype.execute = function (callback) {
        return this.DbModel.then(function (model) { return callback(model); });
    };
    return BaseDao;
}());
exports.BaseDao = BaseDao;
