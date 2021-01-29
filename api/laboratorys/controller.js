const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'laboratorys'; // variable para no repetir la colección

async function pushLaboratory(laboratory) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(laboratory);
    await mongoClient.close();
  
    return state;
  }

  async function getLaboratorys(recivedIdPatient){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find({ patientid: recivedIdPatient})
    .toArray();
    await mongoClient.close();

    return state;

  }

  async function deleteLaboratory(laboratoryid){

    const mongoClient = await connection.getConnection();

    const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(laboratoryid)})

    await mongoClient.close();

    return state;

  }


  module.exports = { pushLaboratory, getLaboratorys, deleteLaboratory };