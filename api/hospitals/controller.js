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

  async function getHospitals() {
    const mongoClient = await connection.getConnection();
    const hospitalsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return hospitalsCollection;
  }

  async function deleteHospital(hospitalid){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(hospitalid)})
    await mongoClient.close();

    return result;
  }

  async function putHospital(hospitalid, newData){

    const query = { _id: new mongo.ObjectID(hospitalid) };

    const newValuesToInsert = {
  
      $set: {
        name: newData.name,
        adress: newData.adress,
        phone: newData.phone
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

  module.exports = {pushHospital, getHospitals, deleteHospital, putHospital};