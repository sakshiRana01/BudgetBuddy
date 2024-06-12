import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('6656a25f00111be8b273');                

export const account = new Account(client);
export const databases = new Databases(client);
