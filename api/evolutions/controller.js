const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'evolutions'; // variable para no repetir la colección

async function pushEvolution(evolution) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(evolution);
    await mongoClient.close();
  
    return state;
  }

  module.exports = { pushEvolution };