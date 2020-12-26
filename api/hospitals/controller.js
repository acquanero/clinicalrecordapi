const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'hospitals'; // variable para no repetir la colección

async function pushHospital(hospital) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(hospital);
    await mongoClient.close();
  
    return state;
  }

  module.exports = {pushHospital};