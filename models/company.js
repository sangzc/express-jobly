/** Company class for Jobly*/

const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const sqlGetCompaniesQueries = require("../helpers/sqlGetCompaniesQueries")


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


/**
 * 
 * return the handle and name for all of the company objects. 
 * search: 
 *  - a filtered list of handles and names 
 *  - handles should be displayed based on the search term and if the name includes it.
 * min_employees: 
 *  - companies with num_employees > min_employees.
 * max_employees:
 * - companies with num_employees < max_employees.
 * min_employees > max_employees: 400 status and a message
 * 
 *
 */
  static async getAll({ search, min_employees, max_employees }) {
    // sql_get_queries.js is a specialized helper for companies. 
    // But if we want to use the helper generically, these values are necessary:
    // const table = "companies";
    // const columns = ["handle", "name"];

    // This statement will be true only if min and max employees
    // are given (not undefined). It handles comparisons of undefined with a number as false
    if (min_employees > max_employees){
      throw { message: `Value for Minimun Number of employees
       should be greater than the value for Maximun Number of employees.` }
    }

    const { query, values } = sqlGetCompaniesQueries({search, min_employees, max_employees});
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