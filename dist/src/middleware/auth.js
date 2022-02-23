"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../env"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        jsonwebtoken_1.default.verify(token, env_1.default.SECRET);
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
module.exports = { verifyToken };
