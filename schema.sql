-- DROP DATABASE IF EXISTS restaurant;

CREATE DATABASE restaurant;

-- USE restaurant;
\c restaurant;

CREATE TABLE dining_style(
  id integer PRIMARY KEY,
  style_name char(30)
);

INSERT INTO dining_style (id, style_name) VALUES
  (1, 'Casual Dining'),
  (2, 'Casual Elegant'),
  (3, 'Fast Casual'),
  (4, 'Family Style'),
  (5, 'Fine Dining'),
  (6, 'Café or Bistro'),
  (7, 'Pop Up Restaurant');


CREATE TABLE cuisine(
  id integer PRIMARY KEY,
  cuisine_name char(30)
);

INSERT INTO cuisine (id, cuisine_name) VALUES
  (1, 'American'),
  (2, 'Italian'),
  (3, 'Steakhouse'),
  (4, 'Seafood'),
  (5, 'French'),
  (6, 'Indian'),
  (7, 'Mexican'),
  (8, 'Japanese'),
  (9, 'Chinese'),
  (10, 'German'),
  (11, 'Spanish'),
  (12, 'Pizzaria'),
  (13, 'Fusion / Eclectic'),
  (14, 'Tapas / Small Plates');

CREATE TABLE dress_code(
  id integer PRIMARY KEY,
  dress_code char(30)
);

INSERT INTO dress_code(id, dress_code) VALUES 
  (1, 'Casual Dress'),
  (2, 'Casual'),
  (3, 'Smart Casual'),
  (4, 'Formal'),
  (5, 'Business Casual');

CREATE TABLE tag(
  id integer PRIMARY KEY,
  tag char(30)
);

INSERT INTO tag(id, tag) VALUES 
  (1, 'Business meals'),
  (2, 'Great for Lunch'),
  (3, 'Banquet'),
  (4, 'Full Bar'),
  (5, 'Corkage Fee'),
  (6, 'Non-smoking'),
  (7, 'Wheelchair Access'),
  (8, 'Special Occasion'),
  (9, 'Good for a Date'),
  (10, 'Great for Dinner'),
  (11, 'Neighborhood Gem'),
  (12, 'Casual');


CREATE TABLE payment(
  id integer PRIMARY KEY,
  payment_option char(20)
);

INSERT INTO payment VALUES 
  (1, 'AMEX'),
  (2, 'Carte Blanche'),
  (3, 'Diners Club'),
  (4, 'Discover'),
  (5, 'JCB'),
  (6, 'Master Card'),
  (7, 'Visa');

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
  restaurant_id integer REFERENCES restaurant(id) ON DELETE CASCADE,
  tag_id integer REFERENCES tag(id),
  vote integer
);

CREATE INDEX tag_per_restaurant_restaurant_id_idx ON tag_per_restaurant (restaurant_id);

CREATE TABLE payment_per_restaurant(
  restaurant_id integer REFERENCES restaurant(id) ON DELETE CASCADE,
  payment_id integer REFERENCES payment(id)
);

CREATE INDEX payment_per_restaurant_restaurant_id_idx ON payment_per_restaurant (restaurant_id);



/*  Execute this file from the command line by typing:
 *   psql dbname <schema.sql
*/
