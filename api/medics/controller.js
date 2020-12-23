const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'medics'; // variable para no repetir la colección

async function getMedicos() {
    const mongoClient = await connection.getConnection();
    const medicosCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return medicosCollection;
  }

  async function pushMedico(medico) {
    const mongoClient = await connection.getConnection();
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(medico);
    await mongoClient.close();
  
    return state;
  }

  module.exports = { getMedicos, pushMedico };