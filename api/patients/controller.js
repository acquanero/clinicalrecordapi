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

  async function getPatients() {
    const mongoClient = await connection.getConnection();
    const patientsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return patientsCollection;
  }

  async function deletePatient(patientid){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(patientid)})
    await mongoClient.close();

    return result;
  }

  module.exports = {pushPatient, getPatients, deletePatient};