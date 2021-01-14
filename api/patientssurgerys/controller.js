const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'patientssurgerys'; // variable para no repetir la colección

async function pushPatientSurgery(patientSurgery) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(patientSurgery);
    await mongoClient.close();
  
    return state;
  }

  module.exports = { pushPatientSurgery };