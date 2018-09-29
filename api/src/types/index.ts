import * as elasticsearch from 'elasticsearch';

export type RouteState = {
  esClient: elasticsearch.Client,
};
