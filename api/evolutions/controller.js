const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'evolutions'; // variable para no repetir la colección

async function pushEvolution(evolution) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(evolution);
    await mongoClient.close();
  
    return state;
  }

  async function getPatientEvolutions(recivedPatientId){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find({patientid: recivedPatientId})
    .toArray();

    return state;
  }

  async function deletePatientEvolution(evolutionid){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(evolutionid) });

    return state;

  }

  module.exports = { pushEvolution, getPatientEvolutions, deletePatientEvolution };