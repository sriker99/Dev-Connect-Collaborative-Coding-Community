const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const SECRET = "7DJGickhf"
    return jwt.sign({_id}, SECRET);
}

module.exports = { createToken };