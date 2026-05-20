import { betterAuth } from "better-auth";
import { mongoAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("PetTopia");

export const auth = betterAuth({
    database: mongoAdapter(db),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }
    }
});