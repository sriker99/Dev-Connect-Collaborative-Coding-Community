const { signup, login } = require('../../middleware/auth-controller.js');
const { createToken } = require('../../middleware/authenticate.js');

const UserController = (app) => {
    app.post("/api/user/login", loginUser);
    app.post("/api/user/signup", signupUser);
    app.post("/api/user/logout", logoutUser);
}

//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
            const token = createToken(user._id);
            if(token) {
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
              }).json({success: true, user: user, token: token}); 
            }
    }
    catch(error) {
        console.log("SERVER ERROR", error);
        res.json({success: false, user: {}, error: error, token: ""});
    }
}

//signup user
const signupUser = async (req, res) => {
    const {username, email, password, cpassword, reputation} = req.body;

    try {
        const user = await signup(username, email, password, cpassword, reputation);
        const token = createToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
          }).json({success: true, user: user, token: token});
    }
    catch(error) {
        res.json({success: false, user: {}, error: error, token: ""});
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
}



module.exports = { UserController };