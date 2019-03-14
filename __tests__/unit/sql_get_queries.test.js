
const partialUpdate = require('../../helpers/partialUpdate');

describe("partialUpdate()", () => {
  it("should generate a proper partial update query with just 1 field",
      function () {
      const expectedResult = {query:"UPDATE users SET first_name=$1 WHERE id=$2 RETURNING *", values: ["sandy",9999]}
      const testResult = partialUpdate("users", {"first_name": "sandy"}, "id", 9999);
      expect(testResult).toEqual(expectedResult);
  });
});

