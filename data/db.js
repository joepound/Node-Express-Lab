const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function fiftyFifty(res) {
  return Math.floor(Math.random() * 2) ? res : Promise.reject({
    message: "TRY AGAIN"
  });
}

function find() {
  return fiftyFifty(db('posts'));
}

function findById(id) {
  return fiftyFifty(db('posts').where({ id: Number(id) }));
}

function insert(post) {
  return fiftyFifty(db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] })));
}

function update(id, post) {
  return fiftyFifty(db('posts')
    .where('id', Number(id))
    .update(post));
}

function remove(id) {
  return fiftyFifty(db('posts')
    .where('id', Number(id))
    .del());
}
