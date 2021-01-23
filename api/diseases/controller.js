const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'diseases'; // variable para no repetir la colección

async function pushDisease(disease) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(disease);
    await mongoClient.close();
  
    return state;


  }

  async function getDiseases() {
    const mongoClient = await connection.getConnection();
    const diseases = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return diseases;
  }

  async function deleteDisease(id){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(id)})
    await mongoClient.close();

    return result;
  }

  async function putDisease(id, newname){

    const query = { _id: new mongo.ObjectID(id) };

    const newValuesToInsert = {
  
      $set: {
        name: newname
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


  module.exports = { pushDisease, getDiseases, deleteDisease, putDisease } ;