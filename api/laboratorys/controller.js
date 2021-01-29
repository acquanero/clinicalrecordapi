const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'laboratorys'; // variable para no repetir la colección

async function pushLaboratory(laboratory) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(laboratory);
    await mongoClient.close();
  
    return state;
  }

  module.exports = { pushLaboratory  };