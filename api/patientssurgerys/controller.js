const mongo = require('mongodb');
const connection = require('../../dbconnection/dbclient');

const COLLECTION_PATIENTS_SURGERIES = 'patientssurgerys';
const COLLECTION_SURGERY_SUPPLYS_RELATION = 'surgerysupplys';
const COLLECTION_WITH_SUPPLY_NAMES = 'supplys';

async function pushPatientSurgery(patientSurgery) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_PATIENTS_SURGERIES)
      .insertOne(patientSurgery);
    await mongoClient.close();
  
    return state;
  }

  async function getPatientSurgerys(id) {

    const query = { patientid: id};

    const mongoClient = await connection.getConnection();
    const patientsCollection = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_PATIENTS_SURGERIES)
      .find(query)
      .toArray();
    await mongoClient.close();
  
    return patientsCollection;
  }

  async function deletePatientSurgery(id){

    const mongoClient = await connection.getConnection();
    const result = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_PATIENTS_SURGERIES)
      .deleteOne({ _id: new mongo.ObjectID(id) });
    await mongoClient.close();
  
    return result;
  }

  async function updatePatientSurgery(id, newData){

    const mongoClient = await connection.getConnection();

    const query = { _id: new mongo.ObjectID(id) };
  
    const newValuesToInsert = {
  
      $set: {
        patientid: newData.patientid,
        typeofsurgeryid: newData.typeofsurgeryid,
        pathologyid: newData.pathologyid,
        date: newData.date,
        description: newData.description
      },
  
    }
  
    const result = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_PATIENTS_SURGERIES)
      .updateOne(query, newValuesToInsert);
    await mongoClient.close();
  
    return result;

  }

  //Functions to perform CRUD on DEPENDANT_COLLECTION

  async function pushPatientSurgerySupply(newSurgerySupply) {

    const mongoClient = await connection.getConnection();
  
    const state = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_SURGERY_SUPPLYS_RELATION)
      .insertOne(newSurgerySupply);
    await mongoClient.close();
  
    return state;
  }

  //Function that gets all de entries from Collection where the surgery ID us found and the gets the name of the supplys

  async function getPatientSurgerySupplys(recivedSurgeryId){

    const query = { surgeryid: recivedSurgeryId};

    const mongoClient = await connection.getConnection();

    const arrayOfSurgerySupplysIdRelation = await mongoClient
      .db(connection.clinicalRecordDb)
      .collection(COLLECTION_SURGERY_SUPPLYS_RELATION)
      .find(query)
      .toArray();

    let arrayOfSurgerySupplysIdName = {
      supplys: [],
    };

    for (const objectSupplyIdName of arrayOfSurgerySupplysIdRelation){

      let queryForNames = { _id: new mongo.ObjectID(objectSupplyIdName.supplyid) }

      let oneSupply = await mongoClient
        .db(connection.clinicalRecordDb)
        .collection(COLLECTION_WITH_SUPPLY_NAMES)
        .findOne(queryForNames)

      console.log(oneSupply.name);

      arrayOfSurgerySupplysIdName.supplys.push(oneSupply.name);

    }

    console.log(arrayOfSurgerySupplysIdName);

    await mongoClient.close();


    return arrayOfSurgerySupplysIdName;

  }

  async function deletePatientSurgerySupply(surgerysupplyid){

    const query = { _id: new mongo.ObjectID(surgerysupplyid)};

    const mongoClient = await connection.getConnection();

    const result = await mongoClient
    .db(connection.clinicalRecordDb)
    .collection(COLLECTION_SURGERY_SUPPLYS_RELATION)
    .deleteOne(query);

    await mongoClient.close();

    return result;

  }

  module.exports = { pushPatientSurgery, getPatientSurgerys, deletePatientSurgery, updatePatientSurgery, 
    pushPatientSurgerySupply, getPatientSurgerySupplys, deletePatientSurgerySupply };