const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'studysfiles'; // variable para no repetir la colección

async function pushStudyFile(studyfile) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(studyfile);
    await mongoClient.close();
  
    return state;
  };

  module.exports = {pushStudyFile}