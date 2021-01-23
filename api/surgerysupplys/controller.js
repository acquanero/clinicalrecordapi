const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'supplys'; // variable para no repetir la colección

async function pushSupply(supply) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(supply);
    await mongoClient.close();
  
    return state;


  }

  async function getSupplys() {
    const mongoClient = await connection.getConnection();
    const supplys = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return supplys;
  }

  async function putSupply(supplyid, newname){

    const query = { _id: new mongo.ObjectID(supplyid) };

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

  module.exports = { pushSupply, getSupplys, putSupply };