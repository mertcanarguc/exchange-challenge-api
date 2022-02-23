import { Router } from 'express';
import TradeController from './controllers/TradeController'
import Middleware from '../middleware/auth'

const router = Router();

router.post('/exchange',Middleware.verifyToken,TradeController.Exchange)
router.get('/get-wallet',Middleware.verifyToken,TradeController.GetUserWallets)
router.get('/get-trade-history',Middleware.verifyToken,TradeController.GetTradeHistory)


export default router;