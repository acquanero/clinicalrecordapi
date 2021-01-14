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

  async function getPatientSurgerys(id) {

    const query = { patientid: id};

    const mongoClient = await connection.getConnection();
    const patientsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find(query)
      .toArray();
    await mongoClient.close();
  
    return patientsCollection;
  }

  module.exports = { pushPatientSurgery, getPatientSurgerys };