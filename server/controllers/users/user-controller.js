const { signup, login } = require('../../middleware/auth-controller.js');
const { createToken } = require('../../middleware/authenticate.js');

const UserController = (app) => {
    app.post("/api/user/login", loginUser);
    app.post("/api/user/signup", signupUser);
}

//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
        console.log(user);
        const token = createToken(user._id);
        res.json({success: true, user: user, token: token});
    }
    catch(error) {
        console.log("SERVER ERRPR", error);
        res.json({success: false, user: {}, error: error});
    }
}

//signup user
const signupUser = async (req, res) => {
    const {username, email, password, cpassword} = req.body;

    try {
        const user = await signup(username, email, password, cpassword);
        const token = createToken(user._id);
        res.json({success: true, user: user, token: token});
    }
    catch(error) {
        res.json({success: false, user: {}, error: error});
    }
}

module.exports = { UserController };