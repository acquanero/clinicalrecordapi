const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'insurancecategorys'; // variable para no repetir la colección

async function pushInsuranceCategory(category) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(category);
    await mongoClient.close();
  
    return state;
  }

  async function getInsuranceCategorys() {
    const mongoClient = await connection.getConnection();
    const insurancesCategorysCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return insurancesCategorysCollection;
  }

async function getCategorysByInsurance(id) {

  const query = { insuranceid: id };

  const mongoClient = await connection.getConnection();
  const insurancesCategorysCollection = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray();
  await mongoClient.close();

  return insurancesCategorysCollection;

}

async function deleteInsuranceCategory(id){
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
  .db(connection.clinicalRecordDb)
  .collection(COLLECTION_NAME)
  .deleteOne({_id: new mongo.ObjectID(id)})
  await mongoClient.close();

  return result;
}


  module.exports = {pushInsuranceCategory , getInsuranceCategorys, getCategorysByInsurance, deleteInsuranceCategory};