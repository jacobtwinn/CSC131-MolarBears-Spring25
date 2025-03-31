import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load environment variables from .env file
/*
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // process code 1 code means exit with failure, 0 means success
    }
};
*/
const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
let database;

export const connectToServer = () => {
    database = client.db("mongodbVSCodePlaygroundDB");
};

export const getDb = () => {
    return database;
};
