import { MongoClient } from 'mongodb';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const dbName = 'flashcards';
const client = new MongoClient('mongodb://localhost:27017');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePrefix = `${__dirname}/../data`;

const saveData = async (collection, fileName: string) => {
  const file = `${filePrefix}/${fileName}.json`;
  try {
      const data = fs.readFileSync(file, 'utf-8');
      const jsonData = JSON.parse(data);

      if (!jsonData || !jsonData.length) {
        console.warn(`No data in ${fileName} collection.`)
        return;
      }
      await collection.insertMany(jsonData);
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

  await saveData(flashcardsCollection, 'flashcards');
  await saveData(categoriesCollection, 'categories');

  client.close();
};


exportData()
  .then(() => console.log('Successfully exported data.'))
  .catch(console.error)
  .finally(() => client.close);