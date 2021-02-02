const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const connection = require('.././dbconnection/dbclient');


module.exports = (req, res, next) => {

    const xappid = req.headers.xappid;
    // const token = req.headers.authorization;

    // if (!token || !xappid){
    //     return res.sendStatus(403);
    // }

    var msgfail = {
        msg: "Unauthorized"
    }

    if (xappid == process.env.XAPPID) {

        return next();

    } else {

        res.status(401)
        return res.send(msgfail);

    }
};