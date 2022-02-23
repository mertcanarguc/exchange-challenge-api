import UserModel from "../models/user";
import WalletModel from "../models/wallet";
import { Request, Response, NextFunction } from 'express';
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../../env'

const Register = async (req: Request<{ firstname: string, lastname: string, email: string, password: string }>, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, password, email } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: 'All input is required for create user.'
      });
    }

    const oldUser = await UserModel.findOne({ 'email': email });

    if (oldUser) {
      return res.json({
        status: false,
        message: 'User Already Exist. Please Login.'
      });
    }

    const encryptedPassword = await Bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({
      user_id: user._id,
    },
      config.SECRET, {
      expiresIn: '24h',
    }
    );
    user.token = token;
    WalletModel.insertMany([
      { user_id: user._id, coin: "XRP", amount: 40000 },
      { user_id: user._id, coin: "ETH", amount: 0 },
      { user_id: user._id, coin: "DASH", amount: 0 },
      { user_id: user._id, coin: "LTC", amount: 0 },
    ])
    res.status(201).json({
      status: true,
      user:user,
      token:token,
      userid:user._id
    });

  } catch (err) {
    throw err;
  }
}

const Login = async (req: Request<{ email: string,password: string }>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: 'All input is required'
      });
    }
    const user = await UserModel.findOne({ email: email });

    if (user && (await Bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email },
        config.SECRET, {
        expiresIn: '24h',
      }
      );

      res.json({
        status: true,
        user: {
          firstname:user.firstname,
          lastname:user.lastname,
          id: user._id,
          email: user.email
        },
        token: token
      });
    } else {
      res.json({
        status: false,
        message: 'Invalid Credentials'
      });
    }

  } catch (err) {
    throw err
  }
}

const GetUserInfo = async (req: Request, res: Response, next: NextFunction) => {

  let user = await UserModel.findById({ '_id': req.body.id })
  if (user) {
    res.json({ success: true, data: user })
  } else {
    res.json({ success: false, message: 'Not found' })
  }
}

export = { Register, Login, GetUserInfo }