const { MongoClient } = require('mongodb');

const uri = process.env.MONGODBKEY;
const clinicalRecordDb = 'daicim';

async function getConnection() {
  if (!uri) {
    console.error('ERROR: MONGODB URI is not provided');
  }
  return new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .connect()
    .catch((err) => console.error(err));
}

module.exports = { getConnection, clinicalRecordDb };