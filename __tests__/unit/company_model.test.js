const db = require("../../db");
const Company = require("../../models/company");


describe("Test Company class", async function () {
  beforeEach(async function () {
    await db.query("DELETE FROM companies");
    await Company.create({
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

  test("can getByHandle", async function () {
    let res = await Company.getByHandle("google");

    expect(res.name).toBe("Google Inc.");
    expect(res.handle).toBe("google");
  });

  test("can Update", async function () {
    let res = await Company.update({handle: "google", name: "realgoogle", num_employees: 2, description: "just the two of us", logo_url: "https://sara.sandy.com"});

    expect(res.name).toBe("realgoogle");
    expect(res.handle).toBe("google");
    expect(res.num_employees).toBe(2);
    expect(res.description).toBe("just the two of us");
    expect(res.logo_url).toBe("https://sara.sandy.com");
  });


  test("can delete", async function () {
    let deleteRes = await Company.delete("google");
    expect(deleteRes.handle).toBe("google");
    // let getRes = await Company.getByHandle("google");

    // expect(getRes.message).toBe("There is no company with handle: google");
    // expect(getRes).toThrow("{ message: `There is no company with handle: ${handle}`, status: 404}");

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