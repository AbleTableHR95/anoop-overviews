const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'abletablekey'});

let count = 10000000;

const add = (id, tag, count) => {
  const query = `select * from restaurants where id=10000000`

  return client.execute(query);
}


module.exports = {
  add
}