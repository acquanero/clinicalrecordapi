const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'medications'; // variable para no repetir la colección

async function pushMedication(medication) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(medication);
    await mongoClient.close();
  
    return state;
  }

  async function getMedications() {
    const mongoClient = await connection.getConnection();
    const medicationsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return medicationsCollection;
  }

  async function deleteMedication(medicationid){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(medicationid)})
    await mongoClient.close();

    return result;
  }

  async function putMedication(medicationid, newData){

    const query = { _id: new mongo.ObjectID(medicationid) };

    const newValuesToInsert = {
  
      $set: {
        name: newData.name,
        dose: newData.dose
      },
  
    }

    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValuesToInsert);
    await mongoClient.close();

    return result;
  }

  module.exports = {pushMedication, getMedications, deleteMedication, putMedication};