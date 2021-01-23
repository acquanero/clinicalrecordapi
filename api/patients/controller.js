const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'patients'; // variable para no repetir la colección

async function pushPatient(patient) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .insertOne(patient);
    await mongoClient.close();
  
    return state;
  }

  async function getPatients() {
    const mongoClient = await connection.getConnection();
    const patientsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    await mongoClient.close();
  
    return patientsCollection;
  }

  async function deletePatient(patientid){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({_id: new mongo.ObjectID(patientid)})
    await mongoClient.close();

    return result;
  }

  async function putPatient(patientid, newData){

    const query = { _id: new mongo.ObjectID(patientid) };

    const newValuesToInsert = {
  
      $set: {
        name: newData.name,
        surname: newData.surname,
        dni: newData.dni,
        birthdate: newData.birthdate,
        insurance: newData.insurance,
        insurancecategory: newData.insurancecategory,
        adress: newData.adress,
        mail: newData.mail,
        phone: newData.phone,
        hospital: newData.hospital,
        inpatient: newData.inpatient
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


  async function getPatientsListByParam(query){

    const mongoClient = await connection.getConnection();
    const patientsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_NAME)
      .find(query)
      .toArray();
    await mongoClient.close();
  
    return patientsCollection;

  }

  async function getPatient(patientid){
    const mongoClient = await connection.getConnection();
    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .findOne({_id: new mongo.ObjectID(patientid)})
    await mongoClient.close();

    return result;
  }

  async function dischargePatient(patientid){

    const query = { _id: new mongo.ObjectID(patientid) };

    const newValuesToInsert = {
  
      $set: {
        hospital: "",
        inpatient: false
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




  module.exports = {pushPatient, getPatients, deletePatient, putPatient, getPatientsListByParam, getPatient, dischargePatient};