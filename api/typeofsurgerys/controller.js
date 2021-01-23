const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'typeofsurgerys'; // variable para no repetir la colección

async function pushSurgery(surgery) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(surgery);
    await mongoClient.close();
  
    return state;
  }

  async function getSurgerys() {
    const mongoClient = await connection.getConnection();
    const surgerysCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return surgerysCollection;
  }

  async function putSurgery(surgeryid, newname){

    const query = { _id: new mongo.ObjectID(surgeryid) };

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

  module.exports = { pushSurgery, getSurgerys, putSurgery };