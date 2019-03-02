import {MongoConnection} from "../model/helpers/mongo.connection";
import {MongoDbAdapterService} from "../model/helpers/mongodb.adapter.service";
import {CommonInterfaces} from "./commonInterfaces";
import IDbAdapterService = CommonInterfaces.IDbAdapterService;

export abstract class BaseDao<DaoOf> {

    // VARS ======
    private DbModel: any;

    // CLASS VARS ======
    private dbAdapterService: IDbAdapterService; // TODO: add generic adapter-service


    constructor(mongoDbConfig:MongoConnection, schema) {
        this.dbAdapterService = new MongoDbAdapterService(mongoDbConfig);
        //console.log("############mongoDbConfig ", mongoDbConfig);
        //console.log("############getSchemaName ", this.getSchemaName());
        //console.log("############schema ", schema);
        this.DbModel = this.dbAdapterService.defineModel(this.getSchemaName(), schema);
    }

    getAll(): Promise<Array<DaoOf>> {
        return this.execute((dbModel) => dbModel.find({}));
    }


    abstract getSchemaName():string;



    protected execute(callback) {
        return this.DbModel.then(model => callback(model));
    }




}
