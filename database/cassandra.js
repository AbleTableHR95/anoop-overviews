const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'abletablekey'});

const add = (id) => {
  const query = `insert into restaurants JSON '{"id":${id},"name":"restaurant name","description":"nice restaurant","dining_style":"formal","cuisine":"Mexican","breakfast_hours":"1:00pm - 3:00pm","lunch_hours":"1:00pm - 3:00pm","dinner_hours":"1:00pm - 3:00pm","phone_number":"123-456-7890","website":"www.abc.com","dress_code":"no slipper","chef":"Gavin Shriver","lat":123.234,"lng":-123.234,"adress":"earth 123","neighborhood":"good neighborhood","croess_street":"cross street","parking":"use public transportation!","public_transit":"bus only","payment":["visa","master"],"tag":{"good for a date":134,"family":1}}'`
  return client.execute(query);
}


const change = (id, tag, count) => {

  const query = `update restaurants set tag['${tag}'] = ${count} where id=${id}`
  return client.execute(query);
}

const del = (id) => {

  const query = `delete from restaurants where id=${id}`
  return client.execute(query);
}

const find = (id) => {

  const query = `select * from restaurants where id=${id}`
  return client.execute(query);

}

module.exports = {
  change, add, del, find,
}