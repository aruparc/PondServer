"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, payload, message) {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
    }
    ApiResponse.OK = function (message) {
        return new ApiResponse(200, new Void(), message);
    };
    ApiResponse.Error = function (message) {
        return new ApiResponse(500, new Void(), message);
    };
    ApiResponse.OKWithPayload = function (payload, message) {
        return new ApiResponse(200, payload, message);
    };
    ApiResponse.WithPayload = function (statusCode, payload, message) {
        return new ApiResponse(statusCode, payload, message);
    };
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
var Void = /** @class */ (function () {
    function Void() {
    }
    return Void;
}());
exports.Void = Void;
