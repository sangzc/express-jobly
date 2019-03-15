const db = require("../../db");
const Company = require("../../models/company");


const COMPANY_GOOGLE = {
  handle: 'google', 
  name: 'Google Inc.', 
  num_employees: 100000, 
  description: 'hello we are watching you', 
  logo_url: 'http://www.google.com/'
};

const COMPANY_IBM = {
  handle: 'ibm', 
  name: 'IBM', 
  num_employees: 90000, 
  description: 'we are so relevant', 
  logo_url: 'http://www.ibm.com/'
};

describe("Test Company class", function () {
  
  beforeEach(async function () {

    // cleanse the companies table
    await db.query("DELETE FROM companies");

    // create the first record used in following tests
    const companyGoogle = await db.query(`
      INSERT INTO companies (handle, name, num_employees, description, logo_url)
        VALUES ('google', 'Google Inc.', 100000, 'hello we are watching you', 'http://www.google.com/')`);
  });


  test("checks Create", async function () {
    
    let res = await Company.create(COMPANY_IBM);
    expect(res).toEqual(COMPANY_IBM);
  })

  test("checks getByHandle", async function () {

    let res = await Company.getByHandle("google");
    expect(res).toEqual(COMPANY_GOOGLE);
  });

  test("checks Update", async function () {
    
    const COMPANY_GOOGLE_UPDATED = {
      handle: "google", 
      name: "realgoogle", 
      num_employees: 2, 
      description: "just the two of us", 
      logo_url: "https://sara.sandy.com"
    };
    let res = await Company.update(COMPANY_GOOGLE_UPDATED);

    expect(res).toEqual(COMPANY_GOOGLE_UPDATED);
    
  });


  test("checks delete", async function () {
    let deleteRes = await Company.delete("google");
    expect(deleteRes.handle).toEqual("google");
    
    // testing that after delete, the company.handle = google deosn't exist 
    try {
      // below line should throw an error, since google shouldn't exist
      let emptyResult = await Company.getByHandle("google");
      if (emptyResult.rows.length !== 0) 
      expect(false).toEqual("an error should have been raised");
    } catch (err) {
    // we don't need to add anything here, since 

    }
  });

  test("checks get all companies", async function () {

    let res = await Company.getAll({"search":undefined, "min_employees":undefined, "max_employees": undefined});

    expect(res.length).toEqual(1);

    await Company.create(COMPANY_IBM);
    let res2 = await Company.getAll({"search":undefined, "min_employees":undefined, "max_employees": undefined});

    expect(res2.length).toEqual(2);
  })

});

afterAll(async function() {
  // close db connection
  await db.end();
  });