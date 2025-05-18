// An application depends on what roles it will have.

const allRoles = {
  user: ["common", "commonUserCompany", "user"],
  compnay: ["common", "commonUserCompany", "commonCompanyAdmin", "compnay"],
  admin: ["common", "commonAdmin", "commonCompanyAdmin", "admin"],
  superAdmin: ["common", "commonAdmin", "commonCompanyAdmin", "superAdmin"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};