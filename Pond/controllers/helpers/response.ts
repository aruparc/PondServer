import {CommonInterfaces} from "../../interfaces/commonInterfaces";
import Response = CommonInterfaces.Response;

export class ApiResponse<T> {

    statusCode: number;
    payload: T;
    message?:string;

    constructor(statusCode: number, payload: T, message?:string) {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
    }

    static OK(message?): Response<Void>{
        return new ApiResponse<Void>(200, new Void(), message);
    }

    static Error(message?): Response<Void>{
        return new ApiResponse<Void>(500, new Void(), message);
    }

    static OKWithPayload<F>(payload:F, message?): Response<F>{
        return new ApiResponse<F>(200, payload, message);
    }

    static WithPayload<F>(statusCode:number, payload:F, message?): Response<F>{
        return new ApiResponse<F>(statusCode, payload, message);
    }
}

export class Void {

}
