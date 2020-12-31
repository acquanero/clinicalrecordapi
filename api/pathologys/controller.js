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

  module.exports = { pushPathology };