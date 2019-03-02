export namespace CommonInterfaces {

    export interface Response<Payload> {
        statusCode: number
        payload?:Payload
        message?:string
    }

    export interface IMongoDBConnectionConfig {
        connection: string,
        database: string,
        useSsl: any
    }

    export interface IDbAdapterService {

        defineModel(modelName: string, schema: any): Promise<any>;
    }

    export interface IAccount {
        userId,
        spotifyToken,
        hubSettings
    }

    export interface IHub {
        hubId,
        location,
        hubSettings,
        currentSong,
        currentPlaylist,
        listOfInfluencers
    }
}
