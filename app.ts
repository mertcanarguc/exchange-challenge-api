import express from "express";
import bodyParser from 'body-parser';
import config from './env'
import cors from 'cors'
const app = express();

import tradeRouter from "./src/trade/router";
import userRouter from "./src/user/router";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

app.use('/', tradeRouter);
app.use('/users', userRouter);

const port = config.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));