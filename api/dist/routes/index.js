"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("./search");
const router = express_1.Router();
const routes = (state) => {
    router.use('/search', search_1.default(state));
    return router;
};
exports.default = routes;
//# sourceMappingURL=index.js.map