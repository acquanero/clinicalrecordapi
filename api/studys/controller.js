const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'studys'; // variable para no repetir la colección

async function pushStudy(study) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(study);
    await mongoClient.close();
  
    return state;
  }

  async function getStudys(recivedIdPatient){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find({ patientid: recivedIdPatient})
    .toArray();
    await mongoClient.close();

    return state;

  }

  async function deleteStudy(studyid){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(studyid)})

    await mongoClient.close();

    return state;

  }


  module.exports = { pushStudy, getStudys, deleteStudy };