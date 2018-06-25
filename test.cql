
CREATE KEYSPACE IF NOT EXISTS abletableKey WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 3};

USE abletableKey;

CREATE TABLE IF NOT EXISTS restaurants (id int, name text, description text, dining_style text, cuisine text, breakfast_hours text, lunch_hours text, dinner_hours text, phone_number text, website text,  dress_code text, chef text, lat decimal, lng decimal, adress text, neighborhood text, croess_street text, parking text, public_transit text, payment list<text>, tag map<text, int>, PRIMARY KEY(id));

-- COPY restaurants (id,name,description,dining_style,cuisine,breakfast_hours,lunch_hours,dinner_hours,phone_number,website, dress_code,chef,lat,lng,adress,neighborhood,croess_street,parking,public_transit,payment,tag) FROM './cassandra.txt' WITH DELIMITER ='|';

/*
* run 'cqlsh -f test.cql'
*/