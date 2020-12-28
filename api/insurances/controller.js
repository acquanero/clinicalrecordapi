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

  module.exports = { pushInsurance} ;