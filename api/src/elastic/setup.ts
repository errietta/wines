import * as AWS from 'aws-sdk';
import * as elasticsearch from 'elasticsearch';
import * as httpAwsEs from 'http-aws-es';

AWS.config.region = "eu-west-2";

const setup = async (host: string, port?: number): Promise<elasticsearch.Client> => (
  new Promise<elasticsearch.Client>((resolve, reject) => {
    const client = new elasticsearch.Client({
      host: `${host}`,
      log: 'error',
      connectionClass: httpAwsEs,
    });
    client.ping({}, (err) => (err ? reject(err) : resolve(client)));
  })
);

export default setup;
