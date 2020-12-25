const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'medics'; // variable para no repetir la colección

async function getMedics() {
    const mongoClient = await connection.getConnection();
    const medicosCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return medicosCollection;
  }

  async function getMedic(medicid) {
    const mongoClient = await connection.getConnection();
    const medico = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .findOne({ _id: new mongo.ObjectID(medicid) });
    await mongoClient.close();
  
    return medico;
  }

  async function medicLogin(email, password) {
    const mongoClient = await connection.getConnection();
    const medico = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .findOne({ mail: email });
    await mongoClient.close();


    //Set de default response msg
    let myResponse = {"msg": "Wrong user or password"};

    //if an medic is found with that email, check if the password is correct
    //if it is, send back the medic id

    if (medico != null){

      if (password == medico.password){

        myResponse = {"medicid": medico._id};

      }

    }
  
    return myResponse;
  }

async function checkMedicExistence(wantedMail){

  const mongoClient = await connection.getConnection();

  const medicWanted = await mongoClient
  .db(connection.clinicalRecordDb)
  .collection(COLLECTION_NAME)
  .findOne({ mail: wantedMail });
  await mongoClient.close();

  if (medicWanted != null){
    rta = true
  } else {
    rta = false
  }

  return rta;

}

async function pushMedic(medico) {

  const mongoClient = await connection.getConnection();

  const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .insertOne(medico);
  await mongoClient.close();

  return state;
}

async function activateMedic(medicid) {

  const mongoClient = await connection.getConnection();

  const query = { _id: new mongo.ObjectID(medicid) };
  const newValue = {
    $set: {
      active: true
    },
  };

  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValue);
  await mongoClient.close();

  return result;
}

async function deactivateMedic(medicid) {

  const mongoClient = await connection.getConnection();

  const query = { _id: new mongo.ObjectID(medicid) };
  const newValue = {
    $set: {
      active: false
    },
  };

  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValue);
  await mongoClient.close();

  return result;
}


module.exports = { getMedics, pushMedic, checkMedicExistence, activateMedic, deactivateMedic, getMedic, medicLogin};