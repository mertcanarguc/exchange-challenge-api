"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const env_1 = __importDefault(require("./env"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router_1 = __importDefault(require("./src/trade/router"));
const router_2 = __importDefault(require("./src/user/router"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/', router_1.default);
app.use('/users', router_2.default);
const port = env_1.default.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
