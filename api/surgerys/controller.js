const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'surgerys'; // variable para no repetir la colección

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

  module.exports = { pushSurgery, getSurgerys };