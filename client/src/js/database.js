import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

//export function to initialize database
const initdb = async () =>
//creates new database named 'jate' v.1
  openDB('jate', 1, {
    //add database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  //create a connection to the jate database and the version we want to use
  const contactDb = await openDB('jate',1);
  //create new transaction and specify the store and data privileges
  const tx = contactDb.transaction('jate', 'readwrite');
  //open up the desired object store
  const store = tx.objectStore('jate');
  //use the .put() method to updat data in the database
  const request = store.put(content);
  //get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  //create a connection to the jate database and the version we want to use
  const contactDb = await openDB('jate',1);
  //create new transaction and specify the store and data privileges
  const tx = contactDb.transaction('jate', 'readonly');
  //open up the desired object store
  const store = tx.objectStore('jate');
  //use the .getAll() method to get all data in the database.
  const request = store.getAll();
  //get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
