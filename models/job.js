// /** Job class for Jobly*/



// // TODO 

// // *** REPLACE THIS PART ***








// const db = require("../db");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");
// const sqlGetQueries = require("../helpers/sqlGetQueries")


// class Job {

//   /** Create a new job and return the newly created job.
//     * return JSON of {job: jobData}
//    */

//   static async create({ *** REPLACE THIS PART ***}) {
//     // insert into database
//     const res = await db.query(`
//       INSERT INTO companies ( *** REPLACE THIS PART ***)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING  *** REPLACE THIS PART ***`, 
//       [ *** REPLACE THIS PART ***]);

//     // return {jobname, hashedpassword, first_name, last_name, phone}
//     return res.rows[0];
//   }

  
//   /** return a single job found by its id.
//    *  return JSON of {job: jobData}
//    */
//   static async getByHandle(handle) {
    
//     // insert into database
//     const res = await db.query(`
//       SELECT  *** REPLACE THIS PART ***
//       FROM companies
//       WHERE handle = $1`, [handle])
    
//     if (res.rows.length === 0) {
//       throw { message: `There is no job with handle: ${handle}`, status: 404};
//     }
//     // return {jobname, hashedpassword, first_name, last_name, phone}
//     return res.rows[0];
//   }

//   /** help return all of the companies 
//    *  Can filter results as per conditions on the route 
//   */
//   static async getAll({ search, min_employees, max_employees }) {
//     // const table = "companies";
//     // const columns = ["handle", "name"];

//     const { query, values } = sqlGetQueries({search, min_employees, max_employees});
//     const res = await db.query(query, values);
      
//     return res.rows;
//   }

//   /** update an existing job and return the updated job.
//    * return JSON of {job: jobData}
//    */
//   static async update({ *** REPLACE THIS PART ***}) {
//     const table = "companies";
//     const items = {name, num_employees, description, logo_url};
//     const key = "handle";
//     const id = handle;
    
//     const { query, values } = sqlForPartialUpdate(table, items, key, id);
//     // insert into database
//     const res = await db.query(query, values);

//     if (res.rows.length === 0) {
//       throw { message: `There is no job with handle: ${handle}`, status: 404};
//     }

//     return res.rows[0];
//   }

//   /** remove an existing job and return a message.
//    * return JSON of {message: "job deleted"}
//    */
//   static async delete(handle) {
//     // delete from database
//     const res = await db.query(`
//        DELETE FROM companies
//        WHERE handle=$1
//        RETURNING handle`, [handle])

//     if (res.rows.length === 0) {
//       throw { message: `There is no job with handle: ${handle}`, status: 404};
//     }

//   };
// };


// module.exports = job;