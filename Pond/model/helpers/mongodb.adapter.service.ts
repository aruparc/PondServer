// APP-IMPORTS ======
import {CommonInterfaces} from "../../interfaces/commonInterfaces";
import IDbAdapterService = CommonInterfaces.IDbAdapterService;
import {MongoConnection} from "./mongo.connection";

export class MongoDbAdapterService implements IDbAdapterService {

    private mongoConnection:MongoConnection;

    constructor(mongoConnection:MongoConnection) {
        this.mongoConnection = mongoConnection;
    }

    // CLASS METHODS ======
    public defineModel(modelName: string, schema: any): Promise<any> {
        return this.mongoConnection.connection.then(() => {
             return this.mongoConnection.connection.model(modelName, schema, modelName);
        });
    }


}
