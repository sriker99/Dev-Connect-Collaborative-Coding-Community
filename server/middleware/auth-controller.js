let { findUserEmail, findUserName, createUser } = require('../DAO/usersDAO.js');
const bcrypt = require('bcrypt');
const validator = require('validator');

//signup static method
const signup = async (username, email, password, cpassword, reputation) => {

    let errors = {};

    if(!username) {
        errors.username = "Username cannot be empty.";
    }

    if(!email) {
        errors.email = "Email cannot be empty.";
    } else if(!validator.isEmail(email)) {
       errors.email = "Email is not valid. Please, enter a valid email.";
    }

    if(!password) {
        errors.password = "Password cannot be empty.";
    } else if(new RegExp(username, 'i').test(password) || new RegExp(email, 'i').test(password)) {
        errors.password = "Password should not contain username or email.";
    }

    if(password != cpassword) {
        errors.cpassword = "Password does not match";
    }

    const usernameExists = await findUserName(username);
    const emailExists = await findUserEmail(email);

    if(usernameExists) {
        errors.username = "Username already exists. Please, try a different username.";
    }

    if(emailExists) {
        errors.email = "Email already exists. Please, try a different email.";
    }

    if(Object.keys(errors).length > 0) {
        throw errors;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await createUser({username: username, email: email, password: hash, joined_date: new Date(), reputation: reputation});

    return user;

}

const login = async (username, password) => {
    
    let errors = {};
    
    if(!username) {
        errors.username = "Username cannot be empty.";
    }

    if(!password) {
        errors.password = "Password cannot be empty.";
    }
    
    const user = await findUserName(username);
   
    if(!user) {
        errors.username = "Invalid username.";
    }

    if(Object.keys(errors).length > 0) {
        throw errors;
    }

    const match = await bcrypt.compare(password, user.password);

    console.log(errors);

    if(!match) {
       errors.password = "Incorrect password.";
       throw errors;
    }

    return user;

}

module.exports = { signup, login };