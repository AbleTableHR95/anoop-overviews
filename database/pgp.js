const pgp = require('pg-promise')();


const db = pgp({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'restaurant',
  user: process.env.PG_USER || 'postgres',
});


const add = (tagArr, paymentArr) => {
  let id;
  const restaurantQuery = 'insert into restaurant (name,description,dining_style_id,cuisine_id,breakfast_hours,lunch_hours,dinner_hours,phone_number,website,dress_code_id,chef,lat,lng,address,neighborhood,cross_street,parking,public_transit) values (\'occaecati asperiores sed\',\'Et earum aut libero ipsa id reiciendis.\',4,10,\'Breakfast: Daily 6:30am - 11:30am\',\'Lunch: Daily 11:30am - 2:30pm\',\'Tuesday through Saturday 6:00pm - 10:00pm\',\'276-758-7459\',\'http://shanna.com\',5,\'Gavin Shriver\',-49.0699,-37.5741,\'et dolores corrupti, FL 41875\',\'enim ab est\',\'vero at et\',\'Eos rerum minima vel ut quisquam repellendus et nesciunt.\',\'Consequuntur maiores aliquid dignissimos et quam distinctio ut temporibus quia.\')';


  return db.none(restaurantQuery)
    .then(() => {
      db.one('select id from restaurant order by id DESC limit 1')
        .then((data) => {
          id = data.id;
        })
        .then(() => {
          for (let i = 0; i < tagArr.length; i++) {
            db.none(`insert into tag_per_restaurant values (${id},${tagArr[i]},0)`).catch(err => console.log(err));
          }
        })
        .then(() => {
          for (let j = 0; j < paymentArr.length; j++) {
            db.none(`insert into payment_per_restaurant values (${id}, ${paymentArr[j]})`).catch(err => console.log(err, 'this one????'));
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const find = (id) => {
  const query = `select r.id, r.name, r.description, ds.style_name,c.cuisine_name,r.breakfast_hours, r.lunch_hours, r.dinner_hours, r.phone_number, r.website, d.dress_code, r.chef, r.lat, r.lng, r.address, r.neighborhood, r.cross_street, r.parking, r.public_transit, tpr.vote, t.tag, p.payment_option
  from restaurant r
  inner join tag_per_restaurant tpr
  on tpr.restaurant_id=r.id
  inner join tag t
  on tpr.tag_id=t.id
  inner join dress_code d
  on d.id=r.dress_code_id
  inner join payment_per_restaurant ppr
  on ppr.restaurant_id=r.id
  inner join payment p
  on p.id=ppr.payment_id
  inner join dining_style ds
  on ds.id=r.dining_style_id
  inner join cuisine c
  on c.id=r.cuisine_id
  where r.id=${id}`;

  return db.many(query).catch((err) => console.log(err));
};

const change = (id, tag, count) => {
  const query = `update tag_per_restaurant set vote=${count} where restaurant_id=${id} and tag_id=(select id from tag where tag='${tag}')`;
  // console.log(query);
  return db.none(query).catch(err => console.log(err));
};

const del = () => db.one('select id from restaurant order by id DESC limit 1')
  .then((data) => {
    // console.log(data.id);
    const query = `delete from restaurant where id=${data.id}`;
    db.none(query);
  });

module.exports = {
  add, find, change, del,
};
