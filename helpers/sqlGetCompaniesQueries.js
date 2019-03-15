/** sqlGetQueries holder for all queries related to generating SQL for different models */


/**
 * This function will output a different query and value depending on
 * which of the arguments (search, min_employees, max_employees) are
 * supplied.
 * 
 * OUTPUT FORMAT:
 * Object: { query, values }
 * 
 * QUERY EXAMPLE:
    SELECT handle, name 
    FROM companies 
    WHERE name ILIKE $1 
    AND 
    num_employees >  $2 
    AND  
    num_employees < $3
 *
 * VALUES EXAMPLE:
 * ["%g%", 100, 5000]
 */

function sqlGetCompaniesQueries({search, min_employees, max_employees}) {
  let idx = 0;
  let values = [];

  let query = `SELECT handle, name FROM companies` 

  if (search) {
    idx++;
    query += ` WHERE name ILIKE $${idx}`;
    values.push(`%${search}%`);
  }
  
  if (min_employees !== undefined) {
    if (idx===0) {
      query += ' WHERE ';
    } else { 
      query += ' AND ';
    }
    values.push(min_employees);
    idx++;
    query += `num_employees >  $${idx}`;
  }
  
  if (max_employees !== undefined) {
    if (idx===0) {
      query += ' WHERE '
    } else { 
      query += ' AND '
    }
    values.push(max_employees);
    idx++;
    query += ` num_employees < $${idx}`;
  }
  // query.replace(/\s+/g, ' ').trim();
  
    return { query, values };
  }
  
  module.exports = sqlGetCompaniesQueries;
