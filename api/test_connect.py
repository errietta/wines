from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

import os

host = 'search-more-petprojects-aaemnaze53wscctautghtj6lm4.eu-west-2.es.amazonaws.com'
awsauth = AWS4Auth(os.environ.get('AWS_ACCESS_KEY'), os.environ.get('AWS_SECRET_KEY'), os.environ.get('AWS_REGION'), 'es')

es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)
print(es.info())
