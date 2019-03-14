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

    createParticipant(request: any, response: any) {
        let userToken = request.query.token;
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

    storePicture(request: any, response: any) {
        singleUpload(request, response, function(err, some) {
            if (err) {
                return response.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
            }

            //TODO: store 'imageUrl': request.file.location in mongodb

            return response.json({'imageUrl': request.file.location});
        });

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
