const db = require("../../data/dbconfig");
async function addUser(data) {
  return await db("users")
    .insert(data)
    .then(async (r) => await getById(r[0]));
}
async function getById(id) {
  return await db("users").where({ user_id: id }).first();
}

async function getByFilter(username) {
  return await db("users").where({ username }).first();
}

module.exports = { addUser, getByFilter, getById };
