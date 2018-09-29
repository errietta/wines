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
const express_1 = require("express");
const util = require("util");
const router = express_1.Router();
const searchRoutes = (state) => {
    router.get('/', (req, res) => {
        res.json({});
    });
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const search = req.body.search;
        if (!search) {
            return res.status(402).json({ 'error': 'no search body' });
        }
        const client = state.esClient;
        const response = yield client.search({
            index: 'wines',
            body: {
                "query": {
                    "multi_match": {
                        "query": search,
                        "fields": [
                            "title^2",
                            "variety",
                            "region_1",
                            "region_2",
                            "province",
                            "country",
                            "winery",
                            "description",
                            "description.english",
                        ]
                    }
                },
                "highlight": {
                    "fields": {
                        "description.english": {}
                    },
                    "number_of_fragments": 0,
                }
            }
        });
        console.log(util.inspect(response, { depth: null }));
        const filteredResponse = {
            took: response.took,
            timed_out: response.timed_out,
            total: response.hits.total,
            max_score: response.hits.max_score,
            results: response.hits.hits.map(hit => ({
                score: hit._score,
                review: Object.assign({}, hit._source),
                highlight: hit.highlight,
            })),
        };
        return res.json(filteredResponse);
    }));
    return router;
};
exports.default = searchRoutes;
//# sourceMappingURL=index.js.map