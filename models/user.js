// /** user class for Jobly*/



// // TODO 

// // *** REPLACE THIS PART ***








// const db = require("../db");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");
// const sqlGetQueries = require("../helpers/sqlGetQueries")


// class User {

//   /** Create a new user and return the newly created user.
//     * return JSON of {user: userData}
//    */

//   static async create({ *** REPLACE THIS PART ***}) {
//     // insert into database
//     const res = await db.query(`
//       INSERT INTO companies ( *** REPLACE THIS PART ***)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING  *** REPLACE THIS PART ***`, 
//       [ *** REPLACE THIS PART ***]);

//     // return {username, hashedpassword, first_name, last_name, phone}
//     return res.rows[0];
//   }

  
//   /** return a single user found by its id.
//    *  return JSON of {user: userData}
//    */
//   static async getByHandle(handle) {
    
//     // insert into database
//     const res = await db.query(`
//       SELECT  *** REPLACE THIS PART ***
//       FROM companies
//       WHERE handle = $1`, [handle])
    
//     if (res.rows.length === 0) {
//       throw { message: `There is no user with handle: ${handle}`, status: 404};
//     }
//     // return {username, hashedpassword, first_name, last_name, phone}
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

//   /** update an existing user and return the updated user.
//    * return JSON of {user: userData}
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
//       throw { message: `There is no user with handle: ${handle}`, status: 404};
//     }

//     return res.rows[0];
//   }

//   /** remove an existing user and return a message.
//    * return JSON of {message: "user deleted"}
//    */
//   static async delete(handle) {
//     // delete from database
//     const res = await db.query(`
//        DELETE FROM companies
//        WHERE handle=$1
//        RETURNING handle`, [handle])

//     if (res.rows.length === 0) {
//       throw { message: `There is no user with handle: ${handle}`, status: 404};
//     }

//   };
// };


// module.exports = user;