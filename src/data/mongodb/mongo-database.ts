import mongoose from "mongoose";

interface Options{
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase{
    static async connect(options: Options){
        const { dbName, mongoUrl} = options;
        try{
            mongoose.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log(`MongoDB connected to ${dbName} database`);
            return true;
        }
        catch(error){
            console.log('Mongo error connection');
            throw error;
        }
    }
}