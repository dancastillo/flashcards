import { MongoClient } from 'mongodb';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const dbName = 'flashcards';
const client = new MongoClient('mongodb://localhost:27017');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeData = async (collection, fileName: string) => {
  const data = await collection.find({}).toArray();
    
  const file = `${__dirname}/../data/${fileName}.json`;
  try {
      fs.writeFileSync(file, JSON.stringify(data));
      console.log('Done writing to file.');
  }
  catch(err) {
      console.log('Error writing to file');
      console.error(err);
  }
};

const exportData = async () => {
  await client.connect();
  const db = client.db(dbName);

  const flashcardsCollection = db.collection('flashcards');
  const categoriesCollection = db.collection('categories');
  const subcategoriesCollection = db.collection('subcategories');

  const collectionIterator = {
    async *[Symbol.asyncIterator]() {
      yield writeData(flashcardsCollection, 'flashcards');
      yield writeData(categoriesCollection, 'categories');
      yield writeData(subcategoriesCollection, 'subcategories');
    }
  }

  for await (const collection of collectionIterator) {
    collection;
  }

  console.log('Closing connection.');
  client.close();
};


exportData()
  .then(() => console.log('Successfully exported data.'))
  .catch(console.error)
  .finally(() => client.close);