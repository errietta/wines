'use strict';

const data = require('../data/winemag-data-130k-v2.json'); // have mercy on my soul

const elasticsearch = require('elasticsearch');
const AWS = require('aws-sdk');
const connectionClass = require('http-aws-es');

AWS.config.region = "eu-west-2";

const getESClient = () => (
    new elasticsearch.Client({
      host: `${process.env.ES_HOST || 'localhost'}:${process.env.ES_PORT || ''}`,
      log: 'error',
      connectionClass: connectionClass,
      amazonES: {
        credentials: new AWS.EnvironmentCredentials('AWS')
      },
      requestTimeout: 100000,
  })
);

const chunk = (arr, chunkSize) => {
  const ret = [];
  for (let i=0,len=arr.length; i<len; i+=chunkSize) {
    ret.push(arr.slice(i,i+chunkSize));
  }
  return ret;
}

let _idx = 0;
const getNextIdx = () => ++_idx;

const formatDataToES = (entries) => (
  entries.reduce((accumulator, entry) => (
      accumulator.concat([
        { index: { _index: 'wines', _type: 'wines', _id: getNextIdx() } },
        entry,
     ])
  ), [])
);


const indexData = (client, entries) => {
  return client.bulk({
    body: entries
  })
};

(async () => {
  const client = getESClient();
  console.log('connected');
  console.log('entries', data.length);
  //500 at the time!  i actually managed to ALL the RAM by trying to do all at once
  const chunks = chunk(data, 500);
  console.log('chunks:', chunks.length);

  let idx = 0;
  for (const chunk of chunks) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        indexData(
          client,
          formatDataToES(chunk)
        )
        .then(() => console.log("chunk", idx + "/" + chunks.length))
        .then(() => idx++)
        .then(resolve, reject);
      }, 1000)
    })
  }
})();
