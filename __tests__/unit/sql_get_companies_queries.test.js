
const sqlGetCompaniesQueries = require('../../helpers/sqlGetCompaniesQueries');
/**
 * This file is a test for the functionality in the helper function called
 * sqlGetCompaniesQueries. 
 * 
 * ------For reference------
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


describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if all 3 arguments are given, that it returns the complete query',
      function () {
      
      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies WHERE name ILIKE $1 AND num_employees > $2 AND num_employees < $3", 
        "values": ["%g%", 100, 5000]
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":"g", "min_employees":100, "max_employees": 5000});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();
 
      expect(queryResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if search and min queries are given, that it returns the correct query',
      function () {

      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies WHERE name ILIKE $1 AND num_employees > $2", 
        "values": ["%g%", 100]
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":"g", "min_employees":100, "max_employees": undefined});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();

      expect(queryResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if search and max queries are given, that it returns the correct query',
      function () {

      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies WHERE name ILIKE $1 AND num_employees < $2", 
        "values": ["%g%", 5000]
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":"g", "min_employees":undefined, "max_employees": 5000});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();

      expect(queryResult).toEqual(expectedResult);
  });
});

describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if only search is given, that it returns the correct query',
      function () {

      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies WHERE name ILIKE $1", 
        "values": ["%g%"]
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":"g", "min_employees":undefined, "max_employees": undefined});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();

      expect(queryResult).toEqual(expectedResult);
  });
});

describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if min and max queries are given, that it returns the correct query',
      function () {
      // const query = "SELECT handle, name FROM companies WHERE num_employees > $1 AND num_employees < $2"
      // query.replace(/\s+/g, ' ').trim();
      // const expectedResult = {"query": query, "values": [100, 5000]}
      // const queryResult = sqlGetCompaniesQueries({"search":undefined, "min_employees":100, "max_employees": 5000});

      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies WHERE num_employees > $1 AND num_employees < $2", 
        "values": [100, 5000]
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":undefined, "min_employees":100, "max_employees": 5000});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();
      
      expect(queryResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetCompaniesQueries() generates a proper query, 
depending on the number and types of arguments given`, function () {
  it('testing if no argument is given, that it returns the basic query',
      function () {

      // Build expected result which looks like {query: "", values: []}
      const expectedResult = {
        "query": "SELECT handle, name FROM companies", 
        "values": []
      }
      
      // Calling the helper function and saving the result in queryResult
      let queryResult = sqlGetCompaniesQueries({"search":undefined, "min_employees":undefined, "max_employees": undefined});
      
      // normalize sql query to be easier to test (remove whitespace)
      queryResult.query = queryResult.query.replace(/\s+/g, ' ').trim();

      expect(queryResult).toEqual(expectedResult);
  });
});
