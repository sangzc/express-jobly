const db = require("../../db");
const Company = require("../../models/company");


describe("Test Company class", async function () {
  beforeEach(async function () {
    await db.query("DELETE FROM companies");
    let company = await Company.create({
        handle: 'google', 
        name: 'Google Inc.', 
        num_employees: 100000, 
        description: 'hello we are watching you', 
        logo_url: 'http://www.google.com/'
    });
  });

  test("can Create", async function () {
    let res = await Company.getAll({"search":undefined, "min_employees":undefined, "max_employees": undefined});

    expect(res[0].name).toBe("Google Inc.");
    expect(res[0].handle).toBe("google");
    expect(res.length).toBe(1);
  });

  

//   test("can get all companies", async function () {

//     let company = await Company.create({
//         handle: 'ibm', 
//         name: 'IBM', 
//         num_employees: 90000, 
//         description: 'we are so relevant', 
//         logo_url: 'http://www.ibm.com/'
//     });

//     expect(res.companies.length).toBe(2);
//   })




}
);