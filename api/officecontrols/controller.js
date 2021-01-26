const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'officecontrols'; // variable para no repetir la colección

async function pushOfficeControl(officeControl) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(officeControl);
    await mongoClient.close();
  
    return state;
  }

  async function getPatientOfficeControls(recivedPatientId){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find({patientid: recivedPatientId})
    .toArray();

    return state;
  }

  module.exports = { pushOfficeControl, getPatientOfficeControls }