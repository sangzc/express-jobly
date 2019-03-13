/** Company class for message.ly */
const express = require("express");
const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
/** Company of the site. */

class Company {

  /** This will create a new company and return the newly created company.
    * This will return JSON of {company: companyData}
   */

  static async create({handle, name, num_employees, description, logo_url}) {
    // insert into database
    const res = await db.query(`
      INSERT INTO companies (handle, name, num_employees, description, logo_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING handle, name, num_employees, description, logo_url`, 
      [handle, name, num_employees, description, logo_url]);

    // return {companyname, hashedpassword, first_name, last_name, phone}
    return res.rows[0];
  }

  
  /** This will return a single company found by its id.
   * This will return JSON of {company: companyData}
   */
  //TODO:
  static async getByHandle({handle, name, num_employees, description, logo_url}) {
    
    // insert into database
    const res = await db.query(`
      INSERT INTO companies (handle, name, num_employees, description, logo_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING handle, name, num_employees, description, logo_url`, 
      [handle, name, num_employees, description, logo_url]);

    // return {companyname, hashedpassword, first_name, last_name, phone}
    return res.rows[0];
  }

  /** This should return the handle and name for all of the company objects. 
   * It should also allow for the following query string parameters
   * search: If the query string parameter is passed, a filtered list of handles and names handles should be displayed based on the search term and if the name includes it.
   * min_employees. If the query string parameter is passed, titles and company handles should be displayed that have a number of employees greater than the value of the query string parameter.
   * max_employees. If the query string parameter is passed, a list of titles and company handles should be displayed that have a number of employees less than the value of the query string parameter.
   * If the min_employees parameter is greater than the max_employees paramteter, respond with a 400 status and a message notifying that the parameters are incorrect.
   * This should return JSON of {companies: [companyData, ...]}
   */
  //
//   static async getAll({handle, name, num_employees, description, logo_url}) {
//     // insert into database
//     const res = await db.query(`
//       INSERT INTO companies (handle, name, num_employees, description, logo_url)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING handle, name, num_employees, description, logo_url`, 
//       [handle, name, num_employees, description, logo_url]);

//     // return {companyname, hashedpassword, first_name, last_name, phone}
//     return res.rows[0];
//   }

  /** This will update an existing company and return the updated company.
   * This will return JSON of {company: companyData}
   */
  //TODO:
  static async update({handle, name, num_employees, description, logo_url}) {
    const table = "companies";
    const items = {name, num_employees, description, logo_url};
    const key = "handle";
    const id = handle;
    debugger
    const { query, values } = sqlForPartialUpdate(table, items, key, id);

    // insert into database
    const res = await db.query(`${query}`, values);

    // return {companyname, hashedpassword, first_name, last_name, phone}
    return res.rows[0];
  }

  /** This will remove an existing company and return a message.
   * This will return JSON of {message: "Company deleted"}
   */
  //TODO:
//   static async delete({handle, name, num_employees, description, logo_url}) {
//     // insert into database
//     const res = await db.query(`
//       INSERT INTO companies (handle, name, num_employees, description, logo_url)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING handle, name, num_employees, description, logo_url`, 
//       [handle, name, num_employees, description, logo_url]);

//     // return {companyname, hashedpassword, first_name, last_name, phone}
//     return res.rows[0];
//   }
// }
}

module.exports = Company;