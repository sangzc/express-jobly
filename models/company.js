/** Company class for Jobly*/

const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const sqlGetQueries = require("../helpers/sqlGetQueries")


class Company {

  /** Create a new company and return the newly created company.
    * return JSON of {company: companyData}
   */

  static async create({handle, name, num_employees, description, logo_url}) {
    // insert into database
    const res = await db.query(`
      INSERT INTO companies (handle, name, num_employees, description, logo_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING handle, name, num_employees, description, logo_url`, 
      [handle, name, num_employees, description, logo_url]);

    return res.rows[0];
  }


  /** help return all of the companies 
   *  Can filter results as per conditions on the route 
  */
  static async getAll({ search, min_employees, max_employees }) {
    // const table = "companies";
    // const columns = ["handle", "name"];

    if (min_employees > max_employees){
      throw { message: `Value for Minimun Number of employees
       should be greater than the value for Maximun Number of employees.` }
    }

    const { query, values } = sqlGetQueries({search, min_employees, max_employees});
    const res = await db.query(query, values);
      
    return res.rows;
  }
  

  /** return a single company found by its id.
   *  return JSON of {company: companyData}
   */
  static async getByHandle(handle) {
    
    // insert into database
    const res = await db.query(`
      SELECT handle, name, num_employees, description, logo_url
      FROM companies
      WHERE handle = $1`, [handle])
    
    if (res.rows.length === 0) {
      throw { message: `There is no company with handle: ${handle}`, status: 404};
    }

    return res.rows[0];
  }


  /** update an existing company and return the updated company.
   * return JSON of {company: {handle, name, num_employees, description, logo_url}}}
   */
  static async update({handle, name, num_employees, description, logo_url}) {
    const table = "companies";
    const items = {name, num_employees, description, logo_url};
    const key = "handle";
    const id = handle;
    
    const { query, values } = sqlForPartialUpdate(table, items, key, id);
    // insert into database
    const res = await db.query(query, values);

    if (res.rows.length === 0) {
      throw { message: `There is no company with handle: ${handle}`, status: 404};
    }

    return res.rows[0];
  }

  /** remove an existing company and return a message.
   * return JSON of {message: "Company deleted"}
   */
  static async delete(handle) {
    // delete from database
    const res = await db.query(`
       DELETE FROM companies
       WHERE handle=$1
       RETURNING handle`, [handle])

    if (res.rows.length === 0) {
      throw { message: `There is no company with handle: ${handle}`, status: 404};
    }

    return res.rows[0]

  };
};


module.exports = Company;