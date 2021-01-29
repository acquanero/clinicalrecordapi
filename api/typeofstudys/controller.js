const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'typeofstudys'; // variable para no repetir la colección

async function pushTypeOfStudy(typeOfStudy) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(typeOfStudy);
    await mongoClient.close();
  
    return state;


  }

  async function getTypeOfStudys() {
    const mongoClient = await connection.getConnection();
    const typeOfStudys = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return typeOfStudys;
  }

  module.exports = { pushTypeOfStudy, getTypeOfStudys };