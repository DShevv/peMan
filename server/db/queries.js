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

const getCategories = async (id) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`select * from Categories where (Usert=1 OR Usert=${id})`;
    const ids = result.recordset.map((elem) => {
      return elem.Pic;
    });
    const pictures = await getPicture(ids);
    const data = result.recordset.map((elem, index) => {
      elem.Pic = pictures[index];
      return elem;
    });
    if (result.recordset.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

const getPicture = async (ids) => {
  try {
    for (let index = 0; index < ids.length; index++) {
      await sql.connect(sqlConfig);
      const result =
        await sql.query`select Url from Pictures where id=${ids[index]}`;
      ids[index] = result.recordset[0].Url;
    }

    if (ids.length > 0) {
      return ids;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`delete from Categories where id=${id}`;

    if (result.recordset) {
      return result.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getPictures = async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from Pictures`;

    if (result.recordset) {
      return result.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async (userId, name, pic) => {
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`insert into Categories (Usert, Name, Pic) values (${userId}, ${name}, ${pic})`;

    if (result.recordset) {
      return result.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const createSpendings = async (
  userId,
  categoryId,
  value,
  currency,
  date,
  isPeriod,
  delta = null,
  notiDelta = null
) => {
  try {
    let sqlDate = new Date(date).toISOString();
    await sql.connect(sqlConfig);
    const result =
      await sql.query`insert into Spendings (Category, Usert, Value, Currency, Date, isPeriod, Delta, NotiDelta)
      values (${categoryId}, ${userId}, ${value}, ${currency}, ${sqlDate}, ${isPeriod}, ${delta}, ${notiDelta})`;

    if (result.recordset) {
      return result.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getSpendings = async (id, date) => {
  try {
    let sqlDate = {
      start: new Date(date.start).toISOString(),
      end: new Date(date.end).toISOString(),
    };
    let queryStr = `select * from Spendings where Usert='${id}' and Date between '${sqlDate.start}' and '${sqlDate.end}'`;
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

const getPeriod = async (id) => {
  try {
    let queryStr = `select * from Spendings where Usert='${id}' and isPeriod = '1'`;
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

const changePeriodSpend = async (id) => {
  try {
    const queryStr = `select * from Spendings where id='${id}'`;
    await sql.connect(sqlConfig);
    let result = await sql.query(queryStr);
    const item = result.recordset[0];
    console.log(item.isPeriod);
    item.Date = new Date(
      new Date(item.Date).getTime() + Number(item.Delta)
    ).toISOString();
    console.log(item.Date);
    result =
      await sql.query(`insert into Spendings (Category, Usert, Value, Currency, Date, isPeriod, Delta, NotiDelta)
      values (${item.Category}, ${item.Usert}, ${item.Value}, ${item.Currency}, '${item.Date}', '${item.isPeriod}', ${item.Delta}, ${item.NotiDelta})`);
    result = await sql.query(
      `update Spendings set isPeriod='${0}' where id=${id}`
    );
    if (result.recordset) {
      return result;
    } else {
      return false;
    }
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
module.exports.deleteCategory = deleteCategory;
module.exports.getCategories = getCategories;
module.exports.createCategories = createCategories;
module.exports.getPictures = getPictures;
module.exports.createSpendings = createSpendings;
module.exports.getPeriod = getPeriod;
module.exports.getSpendings = getSpendings;
module.exports.changePeriodSpend = changePeriodSpend;
