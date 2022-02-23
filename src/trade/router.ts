import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import TradeController from './controllers/TradeController'
import Middleware from '../middleware/auth'

const router = Router();

router.post('/exchange',Middleware.verifyToken,TradeController.Exchange)
router.get('/get-wallet',Middleware.verifyToken,TradeController.GetUserWallets)
router.get('/get-trade-history',Middleware.verifyToken,TradeController.GetTradeHistory)

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
  res.json({status:true})
})

export default router;