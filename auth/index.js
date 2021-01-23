
module.exports = (req, res, next) => {

    const { xappid } = req.headers

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