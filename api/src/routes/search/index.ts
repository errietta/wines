import { Router } from 'express';
import { RouteState } from '../../types';
import * as util from 'util';

const router = Router();

const searchRoutes = (state: RouteState) => {
  router.get('/', (req, res) => {
    res.json({});
  });
  router.post('/', async (req, res) => {
    const search = req.body.search;
    if (!search) {
      return res.status(422).json({'error': 'no search body'});
    }

    const client = state.esClient;
    const response = await client.search({
      index: 'wines',
      body: {
        "query": {
          "multi_match" : {
            "query": search,
            "fields": [
              "title",
              "variety^2",
              "region_1^2",
              "region_2^2",
              "province^2",
              "country^2",
              "winery",
              "description",
              "description.english",
            ],
            "minimum_should_match": "75%",
          },
        },
        "highlight": {
          "fields": {
            "description.english": {},
            "title": {},
          },
          "number_of_fragments": 0,
        },
        "size": 10
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
        review: { ...hit._source },
        highlight: hit.highlight,
      })),
    }

    return res.json(filteredResponse);
  });

  return router;
};

export default searchRoutes;
