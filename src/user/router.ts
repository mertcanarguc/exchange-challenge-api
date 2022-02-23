import { Router } from 'express';
import UserController from './controllers/UserController'
import Middleware from '../middleware/auth'

const router = Router();

router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.post('/get-user-info', Middleware.verifyToken, UserController.GetUserInfo)

export default router;