"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("../../../env"));
(0, mongoose_1.connect)(env_1.default.MONGO_URI);
const schema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const UserModel = (0, mongoose_1.model)('User', schema);
exports.default = UserModel;
