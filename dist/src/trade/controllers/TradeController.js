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
const wallet_1 = __importDefault(require("../../user/models/wallet"));
const trade_1 = __importDefault(require("../../trade/models/trade"));
const exchange_1 = require("../services/exchange");
const Exchange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.type == "SELL") {
        const result = (0, exchange_1.ExchangeService)(req.body.selling, req.body.buying, req.body.amount);
        let selling = yield wallet_1.default.findOne({ user_id: req.body.userid, coin: req.body.selling });
        selling.update({
            amount: (selling.amount - req.body.amount)
        }, (err, data) => {
            if (!err) {
                return true;
            }
            else {
                return false;
            }
        });
        let buying = yield wallet_1.default.findOne({ user_id: req.body.userid, coin: req.body.buying });
        buying.update({
            amount: (buying.amount + result.amount)
        }, (err, data) => {
            if (!err) {
                return true;
            }
            else {
                return false;
            }
        });
        new trade_1.default({
            user_id: req.body.userid,
            selling_coin: result.selling_coin,
            purchased_coin: result.buying_coin,
            fee: result.fee.toString(),
            amount: result.amount,
        }).save((err, data) => {
            if (!err) {
                res.json({ success: true, data: data });
            }
            else {
                res.json({ success: false, error: err });
            }
        });
    }
    else {
        const result = (0, exchange_1.BuyExchangeService)(req.body.selling, req.body.buying, req.body.amount);
        console.log(result);
        let selling = yield wallet_1.default.findOne({ user_id: req.body.userid, coin: req.body.selling });
        let buying = yield wallet_1.default.findOne({ user_id: req.body.userid, coin: req.body.buying });
        selling.update({
            amount: (selling.amount - result.amount)
        }, (err, data) => {
            if (!err) {
                return true;
            }
            else {
                return false;
            }
        });
        buying.update({
            amount: (buying.amount + Number(req.body.amount))
        }, (err, data) => {
            if (!err) {
                return true;
            }
            else {
                return false;
            }
        });
        new trade_1.default({
            user_id: req.body.userid,
            selling_coin: result.selling_coin,
            purchased_coin: result.buying_coin,
            fee: result.fee.toString(),
            amount: result.amount,
        }).save((err, data) => {
            if (!err) {
                res.json({ success: true, data: data });
            }
            else {
                res.json({ success: false, error: err });
            }
        });
    }
});
const GetUserWallets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let wallets = yield wallet_1.default.find({ 'user_id': req.query.id });
    if (wallets) {
        res.json({ success: true, data: wallets });
    }
    else {
        res.json({ success: false, message: 'Not found' });
    }
});
const GetTradeHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let trades = yield trade_1.default.find({ 'userid': req.params.id });
    if (trades) {
        res.json({ success: true, data: trades });
    }
    else {
        res.json({ success: false, message: 'Not found' });
    }
});
module.exports = { Exchange, GetUserWallets, GetTradeHistory };
