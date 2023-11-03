const config  = require("../config/config");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, config.secret_jwt, (err,decode) =>{
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            } 
            req.user = decode.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
});

module.exports = auth;