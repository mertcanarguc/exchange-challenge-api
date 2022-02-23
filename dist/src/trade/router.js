"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TradeController_1 = __importDefault(require("./controllers/TradeController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/exchange', auth_1.default.verifyToken, TradeController_1.default.Exchange);
router.get('/get-wallet', auth_1.default.verifyToken, TradeController_1.default.GetUserWallets);
router.get('/get-trade-history', auth_1.default.verifyToken, TradeController_1.default.GetTradeHistory);
router.get('/', (req, res, next) => {
    res.json({ status: true });
});
exports.default = router;
