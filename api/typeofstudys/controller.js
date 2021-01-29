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

  async function putTypeOfStudy(typeofstudyid, newname){

    const query = { _id: new mongo.ObjectID(typeofstudyid) };

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

  module.exports = { pushTypeOfStudy, getTypeOfStudys, putTypeOfStudy };