import { MongoClient, Db } from 'mongodb';

let client: MongoClient;

export async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db();
}