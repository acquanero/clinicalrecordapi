const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'patients'; // variable para no repetir la colección

async function pushPatient(patient) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(patient);
    await mongoClient.close();
  
    return state;
  }

  module.exports = {pushPatient};