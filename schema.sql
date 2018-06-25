DROP DATABASE IF EXISTS restaurant;

CREATE DATABASE restaurant;

-- USE restaurant;
\c restaurant;

CREATE TABLE dining_style(
  id integer PRIMARY KEY,
  style_name char(30)
);

CREATE TABLE cuisine(
  id integer PRIMARY KEY,
  cuisine_name char(30)
);

CREATE TABLE dress_code(
  id integer PRIMARY KEY,
  dress_code char(30)
);

CREATE TABLE tag(
  id integer PRIMARY KEY,
  tag char(30)
);

CREATE TABLE payment(
  id integer PRIMARY KEY,
  payment_option char(20)
);

CREATE TABLE restaurant(
  id integer PRIMARY KEY,
  name char(50) not null, 
  description char(300) not null,
  dining_style_id integer REFERENCES dining_style(id),
  cuisine_id integer REFERENCES cuisine(id),
  breakfast_hours char(50) not null,
  lunch_hours char(50) not null,
  dinner_hours char(50) not null,
  phone_number char(20) not null,
  website char(30) not null,
  dress_code_id integer REFERENCES dress_code(id),
  chef char(50) not null,
  lat decimal not null,
  lng decimal not null,
  address char(100) not null,
  neighborhood char(100) not null,
  cross_street char(100) not null,
  parking char(300) not null,
  public_transit char(300) not null
);

CREATE TABLE tag_per_restaurant(
  restaurant_id integer REFERENCES restaurant(id),
  tag_id integer REFERENCES tag(id),
  vote integer
);

CREATE TABLE payment_per_restaurant(
  restaurant_id integer REFERENCES restaurant(id),
  payment_id integer REFERENCES payment(id)
);


/*  Execute this file from the command line by typing:
 *   psql dbname <schema.sql
*/
