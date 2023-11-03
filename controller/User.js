const User = require("../model/User");
const bcrypt = require("bcrypt");
const config  = require("../config/config");
const jwt = require("jsonwebtoken")

const securePassword = async (password) =>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    } catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}

const create_token = async (id) =>{
    try {
        jwt.sign({ _id:id }, config.secret_jwt);
        return  token;
    } catch (error) {
        res.status(400).send(error);
    }
}

const register_user = async(req, res)=>{
    try{
        const spassword = await securePassword(req.body.password);

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
        });
        const userData = await User.findOne({ email:req.body.email });
        if(userData) {
            res.status(400).send({ success: false, msg:"This email is already exists"});
        } else{
            const user_data = await user.save()
            res.status(200).send({ success: true, data: user_data})
        }
    } catch (error){
        res.status(400).send(error.message);
    }
}

const login_user = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }
    const userData = await User.findOne({ email })
    if(userData && (await bcrypt.compare(password, userData.password))) {

        const tokenData = jwt.sign({
            user: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                password: userData.password
            }
        }, config.secret_jwt,
           { expiresIn: "24h" }
           ); const response = {
            success: true, msg: "User Details", token: tokenData,userData
           }
           res.status(200).json({ response });
    } else {
        res.status(401).send({ success:false, msg: "email or password is not valid"})
    }
}



module.exports = { register_user, login_user }