"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const setup_1 = require("./elastic/setup");
const routes_1 = require("./routes");
dotenv.config();
const setupApp = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return app;
};
const startServer = (app) => (new Promise((resolve, reject) => {
    const port = process.env.PORT || 3000;
    app.listen(port, (err) => (err ? reject(err) : resolve()));
}));
const setupRoutes = (app, state) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use(routes_1.default(state));
};
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const esHost = process.env.ES_HOST;
        if (!esHost) {
            throw new Error('please provide ES_HOST');
        }
        const app = setupApp();
        console.log('ES client setting up');
        const esClient = yield setup_1.default(esHost);
        console.log('ES client set up');
        const state = {
            esClient,
        };
        setupRoutes(app, state);
        yield startServer(app);
        console.info('server started');
    }
    catch (e) {
        console.error(e);
    }
}))();
//# sourceMappingURL=server.js.map