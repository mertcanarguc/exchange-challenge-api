"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/register', UserController_1.default.Register);
router.post('/login', UserController_1.default.Login);
router.post('/get-user-info', auth_1.default.verifyToken, UserController_1.default.GetUserInfo);
exports.default = router;
