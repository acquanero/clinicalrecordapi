const mongo = require('mongodb');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'medics'; // variable para no repetir la colección

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

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


//Function to register a new medic

async function registerMedic(medicObject) {

  const name = medicObject.name;
  const surname = medicObject.surname;
  const mdNumber = medicObject.mdNumber;
  const mail = medicObject.mail;
  const password = medicObject.password;
  const admin = medicObject.admin;
  const active = medicObject.active;

  const mongoClient = await connection.getConnection();
  const medicsCollection = await mongoClient.db(connection.clinicalRecordDb).collection(COLLECTION_NAME);

  const randomKey = await crypto.randomBytes(16);
  const newSalt = randomKey.toString('base64');
  const encryptedPassword = crypto.pbkdf2Sync(password, newSalt, 10000, 64, 'sha1').toString('base64');

  const registeredMail = await medicsCollection.findOne({ mail });

   const response = {
    msg: 'The user already exists',
   };

  if (!registeredMail) {
    await medicsCollection.insertOne({
      name,
      surname,
      mdNumber,
      mail,
      password: encryptedPassword,
      salt: newSalt,
      admin,
      active
    });

     response.msg = 'User registration successful';

   }

   await mongoClient.close();

  return response;
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

async function deleteMedic(medicid) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(medicid) });
  await mongoClient.close();

  return result;
}

async function updateMedic(medicid, newData) {

  const mongoClient = await connection.getConnection();

  const query = { _id: new mongo.ObjectID(medicid) };

  const newValuesToInsert = {

    $set: {
      name: newData.name,
      surname: newData.surname,
      mdNumber: newData.mdNumber,
      mail: newData.mdNumber,
      password: newData.password
    },

  }

  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .updateOne(query, newValuesToInsert);
  await mongoClient.close();

  return result;

}


module.exports = { getMedics, registerMedic, checkMedicExistence, activateMedic, deactivateMedic, getMedic, medicLogin, deleteMedic, updateMedic};