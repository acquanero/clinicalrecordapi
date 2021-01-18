const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'biopsys'; // variable para no repetir la colección

async function pushBiopsy(biopsy) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(biopsy);
    await mongoClient.close();
  
    return state;
  };

  module.exports = { pushBiopsy };