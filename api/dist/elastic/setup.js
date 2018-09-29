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
const AWS = require("aws-sdk");
const elasticsearch = require("elasticsearch");
const httpAwsEs = require("http-aws-es");
AWS.config.region = "eu-west-2";
const setup = (host, port) => __awaiter(this, void 0, void 0, function* () {
    return (new Promise((resolve, reject) => {
        const client = new elasticsearch.Client({
            host: `${host}`,
            log: 'error',
            connectionClass: httpAwsEs,
        });
        client.ping({}, (err) => (err ? reject(err) : resolve(client)));
    }));
});
exports.default = setup;
//# sourceMappingURL=setup.js.map