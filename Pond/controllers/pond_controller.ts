// LIB IMPORTS
import {CommonInterfaces} from "../interfaces/commonInterfaces";
import Response = CommonInterfaces.Response;

// APP IMPORTS
import {PondService} from "../services/pond_service";
import {ApiResponse, Void} from "./helpers/response";

const upload = require('./helpers/multer');

const singleUpload = upload.single('image');


/**
 * @name PondController
 *
 * @description
 * This CONTROLLER is the endpoint for the frontend, it handles the api-routes for user-requests
 */
export class PondController {
    // CONSTS ======

    // VARS ======
    private pondService: PondService = new PondService();

    constructor() {
    }

    // ROUTE HANDLERS ======

    createUser(request: any, response: any) {
        //let userToken = request.query.token;
        let userToken = "000";
        let userId = request.query.userId;
        let password = request.query.password;
        let userName = request.query.name;
        let userInfo = request.query.info;

        if(userToken === undefined || userToken === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userToken"));
        }
        else if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if(password === undefined || password === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: password"));
        }
        else if(userName === undefined || userName === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userName"));
        }
        else if(userInfo === undefined || userInfo === null){
            //response.statuscode = 400;
            //return response.json(ApiResponse.Error("Please specify query parameter: userInfo"));
            userInfo = "Someone interesting and new! It's gonna be legendary, yeehaw #PondIsBagging";
        }

        let userPromise = this.pondService.createUser(userToken, userId, password, userName, userInfo);
        return PondController.payloadHandler(response, userPromise);
    }

    getUserEntry(request: any, response: any) {
        let userId = request.query.userId;
        if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }

        let userEntryPromise = this.pondService.getUserEntry(userId);
        return PondController.payloadHandler(response, userEntryPromise);

    }

    updateUserInfo(request: any, response: any) {
        let userId = request.query.userId;
        let userInfo = request.query.info;
        if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if(userInfo === undefined || userInfo === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: info"));
        }

        let userInfoPromise = this.pondService.updateUserInfo(userId, userInfo);
        return PondController.payloadHandler(response, userInfoPromise);
    }

    getUserInfo(request: any, response: any) {
        let userId = request.query.userId;

        if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }

        let userInfoPromise = this.pondService.getUserInfo(userId);
        return PondController.payloadHandler(response, userInfoPromise);
    }

    storePicture(request: any, response: any) {
        //console.log("storePicture ", request);
        let userId = request.query.userId;
        let picString = request.body.picture;

        let pictureStorePromise = this.pondService.storePictureString(userId, picString);
        return PondController.payloadHandler(response, pictureStorePromise);
    }

    getPicture(request: any, response: any) {
        //console.log("getPicture ", request);
        let userId = request.query.userId;

        let pictureRetrievePromise = this.pondService.getPictureString(userId);
        return PondController.payloadHandler(response, pictureRetrievePromise);
    }

    loginUser(request: any, response: any) {
        let userId = request.query.userId;
        let password = request.query.password;

        let loginPromise = this.pondService.loginUser(userId, password);
        return PondController.payloadHandler(response, loginPromise);
    }

    getMatch(request: any, response: any) {
        let userId = request.query.userId;
        let date = request.query.date;

        if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if(date === undefined || date === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: date"));
        }

        let matchPromise = this.pondService.getMatch(userId, date);
        return PondController.payloadHandler(response, matchPromise);

    }

    updateMatchStatus(request: any, response: any) {
        let userId = request.query.userId;
        let date = request.query.date;
        let status = request.query.status;

        if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if(date === undefined || date === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: date"));
        }
        else if(status === undefined || status === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: status"));
        }

        let statusUpdatePromise = this.pondService.updateMatchStatus(userId, date, status);
        return PondController.payloadHandler(response, statusUpdatePromise);

    }

    createParticipant(request: any, response: any) {
        //let userToken = request.query.token;
        let userToken = "000";
        let userId = request.query.userId;
        let userName = request.query.name;
        let date = request.query.date;
        let time = request.query.time;

        if(userToken === undefined || userToken === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userToken"));
        }
        else if(userId === undefined || userId === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userId"));
        }
        else if(userName === undefined || userName === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: userName"));
        }
        else if(date === undefined || date === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: date"));
        }
        else if(time === undefined || time === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: time"));
        }

        let participantPromise = this.pondService.createParticipant(userToken, userId, userName, date, time);
        return PondController.payloadHandler(response, participantPromise);

    }

    performMatching(request: any, response: any) {
        let authorizationToken = request.query.token;
        let date = request.query.date;

        if(authorizationToken === undefined || authorizationToken === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: authorizationToken"));
        }
        else if(date === undefined || date === null){
            response.statuscode = 400;
            return response.json(ApiResponse.Error("Please specify query parameter: date"));
        }

        let matchingPromise = this.pondService.performMatching(authorizationToken, date);
        return PondController.payloadHandler(response, matchingPromise);

    }

    // HELPERS ======
    private static voidHandler(res, promise: Promise<any>): Promise<Response<Void>> {
        return promise
            .then(res.json(ApiResponse.OK()))
            .catch((err) => {
                res.statuscode = 400;
                return res.json(ApiResponse.Error(err))
            })
    }
//promise: Promise<T>
    private static payloadHandler<T>(res, promise, statusCodeResolver?): Promise<Response<T>> {
        return promise
            .then((resp) => {
                console.log("payloadHandler ", resp);
                let statusCode = (statusCodeResolver) ? statusCodeResolver(resp) : 200;
                return res.json(ApiResponse.WithPayload(statusCode, resp))
            })
            .catch((err) => {
                console.error('Error while processing NLU Gateway service', err);
                res.statuscode = 400;
                return res.json(ApiResponse.Error(err))
            })
    }
}
