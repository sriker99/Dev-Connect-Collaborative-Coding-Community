let userModel = require('../models/users.js');

const findUserEmail = async(email) => await userModel.findOne({email: email});
const findUserName = async(username) => await userModel.findOne({username: username});
const createUser = async(user) => await userModel.create(user);
const findUserById = async(id) => await userModel.findOne({_id: id})

module.exports = { findUserEmail, findUserName, createUser, findUserById};