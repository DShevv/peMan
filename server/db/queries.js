const sql = require("mssql");

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: `localhost`,
  database: "PeMan",

  options: {
    encrypt: false,

    trustServerCertificate: true,
  },
};

const test = async () => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`insert into Users (email, password, name) values ('ff2', 'fff', 'ffff')`;
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (email) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from Users where email=${email}`;
    if (result.recordset.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (email, password, name, activationLink) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`insert into Users (email, password, name, activationLink) values (${email}, ${password}, ${name}, ${activationLink})`;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`update Users set email=${user.email}, password=${user.password}, name=${user.name}, isActivated=${user.isActivated}, activationLink=${user.activationLink} where id=${user.id}`;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findBy = async (table, rowName, value) => {
  try {
    let queryStr = `select * from ${table} where ${rowName}='${value}'`;
    await sql.connect(sqlConfig);
    const result = await sql.query(queryStr);
    if (result.recordset.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const findAll = async (table) => {
  try {
    let queryStr = `select * from ${table}`;
    await sql.connect(sqlConfig);
    const result = await sql.query(queryStr);
    if (result.recordset.length > 0) {
      return result.recordset;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const updateToken = async (id, token) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`update RefToken set refreshToken=${token} where Usert=${id}`;
  } catch (error) {
    console.log(error);
  }
};

const createToken = async (id, token) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`insert into RefToken (Usert, refreshToken) values (${id}, ${token})`;
  } catch (error) {
    console.log(error);
  }
};

const deleteFrom = async (table, rowName, value) => {
  try {
    let queryStr = `delete from ${table} where ${rowName}='${value}'`;
    await sql.connect(sqlConfig);
    const result = await sql.query(queryStr);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.findBy = findBy;
module.exports.updateToken = updateToken;
module.exports.updateUser = updateUser;
module.exports.deleteFrom = deleteFrom;
module.exports.createToken = createToken;
module.exports.findAll = findAll;
