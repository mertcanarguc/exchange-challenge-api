import jwt from "jsonwebtoken"
import { Request, Response, NextFunction  } from 'express';
import config from '../../env'

const verifyToken = (req: Request<{ token: string }>, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.authorization

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        jwt.verify(token, config.SECRET);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export = { verifyToken };