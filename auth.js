require("dotenv").config()
var jwt = require('jsonwebtoken');

// let token = jwt.sign({
//     data: 'foobar'
// }, process.env.SECRET);

exports.verify = (req, res, next) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1]

        if (!token) throw { status: 404, message: "No token found" }

        req.userData = jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        return res.status(error.status ?? 403).json({ message: error.message || "Error Token" })
    }

}
