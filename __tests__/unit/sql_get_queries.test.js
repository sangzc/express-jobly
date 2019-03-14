
const sqlGetQueries = require('../../helpers/sqlGetQueries');
/**
SELECT handle, name 
FROM companies 
WHERE name ILIKE $1 
AND 
num_employees >  $2 
AND  
num_employees < $3
 */


describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if all 3 arguments are given, that it returns the complete query',
      function () {
      const query = "SELECT handle, name FROM companies WHERE name ILIKE $1 AND num_employees >  $2 AND  num_employees < $3"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": ["%g%", 100, 5000]}
      const testResult = sqlGetQueries({"search":"g", "min_employees":100, "max_employees": 5000});
      expect(testResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if search and min queries are given, that it returns the correct query',
      function () {
      const query = "SELECT handle, name FROM companies WHERE name ILIKE $1 AND num_employees >  $2"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": ["%g%", 100]}
      const testResult = sqlGetQueries({"search":"g", "min_employees":100, "max_employees": undefined});
      expect(testResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if search and max queries are given, that it returns the correct query',
      function () {
      const query = "SELECT handle, name FROM companies WHERE name ILIKE $1 AND  num_employees < $2"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": ["%g%", 5000]}
      const testResult = sqlGetQueries({"search":"g", "min_employees":undefined, "max_employees": 5000});
      expect(testResult).toEqual(expectedResult);
  });
});

describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if only search is given, that it returns the correct query',
      function () {
      const query = "SELECT handle, name FROM companies WHERE name ILIKE $1"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": ["%g%"]}
      const testResult = sqlGetQueries({"search":"g", "min_employees":undefined, "max_employees": undefined});
      expect(testResult).toEqual(expectedResult);
  });
});

describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if min and max queries are given, that it returns the correct query',
      function () {
      const query = "SELECT handle, name FROM companies WHERE num_employees >  $1 AND  num_employees < $2"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": [100, 5000]}
      const testResult = sqlGetQueries({"search":undefined, "min_employees":100, "max_employees": 5000});
      expect(testResult).toEqual(expectedResult);
  });
});


describe(`test sqlGetQueries() generates a proper query, 
depending on the number and types of arguments given`, () => {
  it('testing if no argument is given, that it returns the basic query',
      function () {
      const query = "SELECT handle, name FROM companies"
      query.replace(/\s+/g, ' ').trim();
      const expectedResult = {"query": query, "values": []}
      const testResult = sqlGetQueries({"search":undefined, "min_employees":undefined, "max_employees": undefined});
      expect(testResult).toEqual(expectedResult);
  });
});
