const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'insurances'; // variable para no repetir la colección

async function pushInsurance(insurance) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(insurance);
    await mongoClient.close();
  
    return state;


  }

  async function getInsurances() {
    const mongoClient = await connection.getConnection();
    const insurances = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return insurances;
  }


  module.exports = { pushInsurance, getInsurances} ;