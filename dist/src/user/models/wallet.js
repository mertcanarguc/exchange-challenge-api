"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("../../../env"));
(0, mongoose_1.connect)(env_1.default.MONGO_URI);
const schema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    coin: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date
    }
});
const WalletModel = (0, mongoose_1.model)('Wallet', schema);
exports.default = WalletModel;
