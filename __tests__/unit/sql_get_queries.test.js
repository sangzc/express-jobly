
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
  it('search only',
      function () {
      const expectedResult = `
                                SELECT handle, name 
                                FROM companies 
                                WHERE name ILIKE $1
                            `
      const testResult = sqlGetQueries({"search":"g", "min_employees":100, "max_employees": 5000});
      expect(testResult).toEqual(expectedResult);
  });
});

