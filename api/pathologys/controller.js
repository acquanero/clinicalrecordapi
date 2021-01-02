const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'pathologys'; // variable para no repetir la colección

async function pushPathology(pathology) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(pathology);
    await mongoClient.close();
  
    return state;


  }

  async function getPathologys() {
    const mongoClient = await connection.getConnection();
    const pathologys = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return pathologys;
  }

  async function putPathology(pathologyid, newname){

    const query = { _id: new mongo.ObjectID(pathologyid) };

    const newValuesToInsert = {
  
      $set: {
        name: newname
      },
  
    }

    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValuesToInsert);
    await mongoClient.close();

    return result;
  }

  module.exports = { pushPathology, getPathologys, putPathology };