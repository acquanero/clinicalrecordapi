const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_NAME = 'patients'; // variable para no repetir la colección
const COLLECTION_DISEASES_PATIENTS_RELATION = 'patientsdiseases';
const COLLECTION_WITH_DISEASES_NAMES = 'typeofdiseases';

const COLLECTION_MEDICATIONS_PATIENTS_RELATION = 'patientsmedications';
const COLLECTION_WITH_MEDICATION_NAMES_AND_DOSES = 'medications';

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

async function deletePatient(patientid) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new mongo.ObjectID(patientid) })
  await mongoClient.close();

  return result;
}

async function putPatient(patientid, newData) {

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


async function getPatientsListByParam(query) {

  const mongoClient = await connection.getConnection();
  const patientsCollection = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray();
  await mongoClient.close();

  return patientsCollection;

}

async function getPatient(patientid) {
  const mongoClient = await connection.getConnection();
  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_NAME)
    .findOne({ _id: new mongo.ObjectID(patientid) })
  await mongoClient.close();

  return result;
}

async function dischargePatient(patientid) {

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

//-----------------------------------------------------------------------
//Functions to perform CRUD on PATIENTS DISEASES
//-----------------------------------------------------------------------


async function pushPatientDisease(newPatientDisease) {

  const mongoClient = await connection.getConnection();

  const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_DISEASES_PATIENTS_RELATION)
    .insertOne(newPatientDisease);
  await mongoClient.close();

  return state;
}

//Function that gets all de entries from Collection where the surgery ID us found and the gets the name of the supplys

async function getPatientDiseases(recivedPatientId) {

  const query = { patientid: recivedPatientId };

  const mongoClient = await connection.getConnection();

  const arrayOfPatientsDiseasesIdRelation = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_DISEASES_PATIENTS_RELATION)
    .find(query)
    .toArray();

  let arrayOfDiseasesIdName = {
    diseases: [],
  };

  for (const objectDiseasesIdName of arrayOfPatientsDiseasesIdRelation) {

    let queryForNames = { _id: new mongo.ObjectID(objectDiseasesIdName.diseaseid) }

    let oneDisease = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_WITH_DISEASES_NAMES)
      .findOne(queryForNames)

    let myDiseasesObject = {}

    myDiseasesObject.id = oneDisease._id
    myDiseasesObject.name = oneDisease.name;

    arrayOfDiseasesIdName.diseases.push(myDiseasesObject);

  }

  await mongoClient.close();

  return arrayOfDiseasesIdName;

}

//function to delete a diseases from one patient

async function deletePatientDisease(recivedPatientId, recivedDiseasesId) {

  const query = { diseaseid: recivedDiseasesId, patientid: recivedPatientId };

  const mongoClient = await connection.getConnection();

  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_DISEASES_PATIENTS_RELATION)
    .deleteOne(query);

  await mongoClient.close();

  return result;

}

//-----------------------------------------------------------------------
//Functions to perform CRUD on PATIENTS MEDICATIONS
//-----------------------------------------------------------------------

async function pushPatientMedication(newPatientMedication) {

  const mongoClient = await connection.getConnection();

  const state = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_MEDICATIONS_PATIENTS_RELATION)
    .insertOne(newPatientMedication);
  await mongoClient.close();

  return state;
}

//Function that gets all de entries from Collection where the surgery ID us found and the gets the name of the supplys

async function getPatientMedications(recivedPatientId) {

  const query = { patientid: recivedPatientId };

  const mongoClient = await connection.getConnection();

  const arrayOfPatientsMedicationsIdRelation = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_MEDICATIONS_PATIENTS_RELATION)
    .find(query)
    .toArray();

  let arrayOfMedicationsIdName = {
    medications: [],
  };

  for (const objectMedicationIdName of arrayOfPatientsMedicationsIdRelation) {

    let queryForNames = { _id: new mongo.ObjectID(objectMedicationIdName.medicationid) }

    let oneMedication = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_WITH_MEDICATION_NAMES_AND_DOSES)
      .findOne(queryForNames)

    let myMedicationObject = {}

    myMedicationObject.id = oneMedication._id;
    myMedicationObject.name = oneMedication.name;
    myMedicationObject.dose = oneMedication.dose;

    arrayOfMedicationsIdName.medications.push(myMedicationObject);

  }

  await mongoClient.close();

  return arrayOfMedicationsIdName;

}

//function to delete a diseases from one patient

async function deletePatientMedication(recivedPatientId, recivedMedicationId) {

  const query = { medicationid: recivedMedicationId, patientid: recivedPatientId };

  const mongoClient = await connection.getConnection();

  const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_MEDICATIONS_PATIENTS_RELATION)
    .deleteOne(query);

  await mongoClient.close();

  return result;

}




module.exports = {
  pushPatient, getPatients, deletePatient, putPatient, getPatientsListByParam,
  getPatient, dischargePatient, pushPatientDisease, getPatientDiseases, deletePatientDisease,
  pushPatientMedication, getPatientMedications, deletePatientMedication
};