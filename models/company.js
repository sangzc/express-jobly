/** Company class for message.ly */
const express = require("express");
const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const sqlGetQueries = require("../helpers/sqlGetQueries")
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
  static async getByHandle(handle) {
    
    // insert into database
    const res = await db.query(`
      SELECT handle, name, num_employees, description, logo_url
      FROM companies
      WHERE handle = $1`, [handle])
    
    if (res.rows.length === 0) {
      throw { message: `There is no company with handle: ${handle}`, status: 404};
    }
    // return {companyname, hashedpassword, first_name, last_name, phone}
    return res.rows[0];
  }

  /** This is a static function to help return all of the companies 
   *  (There are a lot of conditions in here!)
  */
  
  static async getAll({ search, min_employees, max_employees }) {
    // const table = "companies";
    // const columns = ["handle", "name"];

    const { query, values } = sqlGetQueries({search, min_employees, max_employees});
    const res = await db.query(query, values);
      
    return res.rows;
  }

  /** This will update an existing company and return the updated company.
   * This will return JSON of {company: companyData}
   */
  //TODO:
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

  /** This will remove an existing company and return a message.
   * This will return JSON of {message: "Company deleted"}
   */
  //TODO:
  static async delete(handle) {
    // delete from database
    const res = await db.query(`
       DELETE FROM companies
       WHERE handle=$1
       RETURNING handle`, [handle])

    if (res.rows.length === 0) {
      throw { message: `There is no company with handle: ${handle}`, status: 404};
    }

  };
};


module.exports = Company;