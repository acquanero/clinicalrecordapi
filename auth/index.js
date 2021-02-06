const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const connection = require('.././dbconnection/dbclient');


module.exports = (req, res, next) => {

    const xappid = req.headers.xappid;
    const token = req.headers.authorization;

    if (!token || !xappid) {
        return res.sendStatus(403);
    }

    if (xappid != process.env.XAPPID) {
        return res.sendStatus(403);
    }

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!decoded) {
            return res.sendStatus(403);
        }
        const { _id } = decoded;
        return connection.getConnection().then((mongoClient) => {
            mongoClient
                .db(connection.clinicalRecordDb)
                .collection('medics')
                .findOne({ _id: new mongo.ObjectID(_id) })
                .then((medico) => {
                    req.medico = medico;
                    return next();
                });
        });
    });
};