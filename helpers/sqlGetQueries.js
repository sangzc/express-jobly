/**
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

function sqlGetQueries({search, min_employees, max_employees}) {
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
  
  module.exports = sqlGetQueries;
