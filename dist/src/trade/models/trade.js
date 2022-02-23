"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("../../../env"));
(0, mongoose_1.connect)(env_1.default.MONGO_URI);
const schema = new mongoose_1.Schema({
    user_id: { type: String },
    selling_coin: { type: Object, required: true },
    purchased_coin: { type: Object, required: true },
    fee: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const TradeModel = (0, mongoose_1.model)('Trade', schema);
exports.default = TradeModel;
