import WalletModel from "../../user/models/wallet";
import TradeModel from "../../trade/models/trade";
import { Request, Response, NextFunction } from 'express';
import { ExchangeService,BuyExchangeService } from "../services/exchange";


const Exchange = async (req: Request, res: Response, next: NextFunction) => {
    
    if (req.body.type == "SELL") {
        const result = ExchangeService(
            req.body.selling,
            req.body.buying,
            req.body.amount
        )
        let selling = await WalletModel.findOne({ user_id: req.body.userid, coin: req.body.selling })
        selling.update({
            amount: (selling.amount - req.body.amount)
        }, (err: any, data: any) => {
            if (!err) {
                return true
            } else {
                return false
            }
        })
        let buying = await WalletModel.findOne({ user_id: req.body.userid, coin: req.body.buying })
        buying.update({
            amount: (buying.amount + result.amount)
        }, (err: any, data: any) => {
            if (!err) {
                return true
            } else {
                return false
            }
        })
        new TradeModel({
            user_id: req.body.userid,
            selling_coin: result.selling_coin,
            purchased_coin: result.buying_coin,
            fee: result.fee.toString(),
            amount: result.amount,
        }).save((err: any, data: any) => {
            if (!err) {
                res.json({ success: true, data: data })
            } else {
                res.json({ success: false, error: err })
            }
        })
    } else {
        const result = BuyExchangeService(
            req.body.selling,
            req.body.buying,
            req.body.amount
        )
        console.log(result)
        let selling = await WalletModel.findOne({ user_id: req.body.userid, coin: req.body.selling })
        let buying = await WalletModel.findOne({ user_id: req.body.userid, coin: req.body.buying })
        selling.update({
            amount: (selling.amount - result.amount)
        }, (err: any, data: any) => {
            if (!err) {
                return true
            } else {
                return false
            }
        })
        buying.update({
            amount: (buying.amount + Number(req.body.amount))
        }, (err: any, data: any) => {
            if (!err) {
                return true
            } else {
                return false
            }
        })

        new TradeModel({
            user_id: req.body.userid,
            selling_coin: result.selling_coin,
            purchased_coin: result.buying_coin,
            fee: result.fee.toString(),
            amount: result.amount,
        }).save((err: any, data: any) => {
            if (!err) {
                res.json({ success: true, data: data })
            } else {
                res.json({ success: false, error: err })
            }
        })
    }

}

const GetUserWallets = async (req: Request, res: Response, next: NextFunction) => {
    let wallets = await WalletModel.find({ 'user_id': req.query.id })

    if (wallets) {
        res.json({ success: true, data: wallets })
    } else {
        res.json({ success: false, message: 'Not found' })
    }
}

const GetTradeHistory = async (req: Request, res: Response, next: NextFunction) => {
    let trades = await TradeModel.find({ 'userid': req.params.id })

    if (trades) {
        res.json({ success: true, data: trades })
    } else {
        res.json({ success: false, message: 'Not found' })
    }
}

export = { Exchange, GetUserWallets, GetTradeHistory }