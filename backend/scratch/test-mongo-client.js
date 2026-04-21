import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Testing with MongoClient...');

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ MongoClient Connected!');
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.dir(err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
run();
