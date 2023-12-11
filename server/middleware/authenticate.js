const jwt = require('jsonwebtoken');
const { findUserById } = require('../DAO/usersDAO');

const createToken = (_id) => {
    const SECRET = "7DJGickhf"
    return jwt.sign({_id}, SECRET, {expiresIn: 60 * 60 * 24});
}

const authenticate = async (req, res, next) => {
    try {
      console.log(next);
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false })
      }
      const decode = jwt.verify(token, "7DJGickhf");
      const user = await findUserById(decode._id);
      console.log("IN AUTHENTICATE", user);
      res.json({success: true, user: user});
    } catch (err) {
    res.clearCookie("token");
    res.json({ success: false, message: "Authentication Failed" });
    }
  };

module.exports = { createToken, authenticate };