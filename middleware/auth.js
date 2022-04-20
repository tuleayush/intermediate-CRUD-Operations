const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(400).json({ msg: 'invaid token' })
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(400).json({ msg: 'invaid Authentication' })
            req.user = user
            next()
        })
    } catch (err) {
        res.status(400).json({ msg: "invalid token" })
        console.log(err);

    } 
}


module.exports = auth