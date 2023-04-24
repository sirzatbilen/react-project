const db = require("../../data/dbconfig");

async function addCompany(data) {
  return await db("companies").insert(data);
}

async function dbCompanyCheck(data) {
  return await db("companies").where(data).first();
}
async function getCompanies() {
  return await db("companies").orderBy("company_id", "desc").limit(3);
}
async function getIdCompany(id) {
  return await db("companies").where("company_id", id).first();
}
async function editCompany(id, data) {
  return await db("companies").where("company_id", id).update(data);
}
async function deleteCompany(id) {
  return await db("companies").where("company_id", id).del();
}
module.exports = {
  addCompany,
  dbCompanyCheck,
  getCompanies,
  getIdCompany,
  editCompany,
  deleteCompany,
};
