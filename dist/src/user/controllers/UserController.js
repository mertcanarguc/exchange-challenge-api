"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_1 = __importDefault(require("../models/user"));
const wallet_1 = __importDefault(require("../models/wallet"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../env"));
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, password, email } = req.body;
        if (!(email && password)) {
            res.status(400).json({
                status: false,
                message: 'All input is required for create user.'
            });
        }
        const oldUser = yield user_1.default.findOne({ 'email': email });
        if (oldUser) {
            return res.json({
                status: false,
                message: 'User Already Exist. Please Login.'
            });
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            user_id: user._id,
        }, env_1.default.SECRET, {
            expiresIn: '24h',
        });
        user.token = token;
        wallet_1.default.insertMany([
            { user_id: user._id, coin: "XRP", amount: 40000 },
            { user_id: user._id, coin: "ETH", amount: 0 },
            { user_id: user._id, coin: "DASH", amount: 0 },
            { user_id: user._id, coin: "LTC", amount: 0 },
        ]);
        res.status(201).json({
            status: true,
            user: user,
            token: token,
            userid: user._id
        });
    }
    catch (err) {
        throw err;
    }
});
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({
                status: false,
                message: 'All input is required'
            });
        }
        const user = yield user_1.default.findOne({ email: email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, env_1.default.SECRET, {
                expiresIn: '24h',
            });
            res.json({
                status: true,
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    id: user._id,
                    email: user.email
                },
                token: token
            });
        }
        else {
            res.json({
                status: false,
                message: 'Invalid Credentials'
            });
        }
    }
    catch (err) {
        throw err;
    }
});
const GetUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findById({ '_id': req.body.id });
    if (user) {
        res.json({ success: true, data: user });
    }
    else {
        res.json({ success: false, message: 'Not found' });
    }
});
module.exports = { Register, Login, GetUserInfo };
