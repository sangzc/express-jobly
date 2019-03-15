// connect to right DB set before loading db.js
process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../../app");
const db = require("../../db");
const ExpressError = require("../../helpers/expressError")

let company;

beforeEach(async function() {
    let result = await db.query(`
        INSERT INTO
            companies (handle, name, num_employees, description, logo_url)
        VALUES ('google', 'Google Inc.', 100000, 'meh', 'www.google.com')
        RETURNING handle, name, num_employees, description, logo_url`);
        
    company = result.rows[0];
});



/** POST /companies 
 * returns `{company: {handle, name}}` */
describe("POST /companies/", async function() {
    test("Can add a company via POST & find it", async function() {
        const response = await request(app)
                        .post('/companies')
                        .send({
                            handle: 'ibm', 
                            name: 'IBM Inc.', 
                            num_employees: 1000, 
                            description: 'We want so bad to be relevant AGAIN !!', 
                            logo_url: 'http://www.ibm.com/'
                        }) 
                        expect(response.status).toEqual(200);

                        const company = response.body.company;
                        expect(company.name).toEqual('IBM Inc.');
                        expect(company.handle).toEqual('ibm');
                    });
                        
    });


/** get all /companies 
 * returns `{companies: [{handle, name}, ...]}` */
describe("GET /companies/:handle", async function() {
    test("Gets single company", async function() {
        const companiesResponse = await request(app).get('/companies');
        expect(companiesResponse.status).toEqual(200);

        const company = companiesResponse.body.companies[0];
        expect(company.name).toEqual('Google Inc.');
        expect(company.handle).toEqual('google');
    });
});


/** GET /companies/handle 
 * returns `{company: {handle, name, num_employees, description, logo_url}}` */
describe("GET /companies/:handle", async function() {
    test("Gets single company", async function() {
        const response = await request(app).get('/companies/google');
        expect(response.statusCode).toEqual(200);

        const company = response.body.company;
        expect(company.name).toEqual('Google Inc.');
        expect(company.handle).toEqual('google');
        expect(company.num_employees).toEqual(100000);
        expect(company.description).toEqual('meh');
        expect(company.logo_url).toEqual('www.google.com');
    });
});


/** PATCH /companies/handle 
 * returns `{company: {handle, name}}` */
describe("PATCH /companies/handle", async function() {
    test("Patches partial update to a single company", async function() {
        const response = await request(app)
                        .patch('/companies/google')
                        .send({
                            handle: 'google',
                            name: 'Alphabet Google Inc.', 
                            num_employees: 100000, 
                            description: 'We are loosing our cool!!', 
                            logo_url: 'http://www.alphabet.com/'
                        }) 
                        expect(response.status).toEqual(200);

                        const company = response.body.company;
                        expect(company.name).toEqual('Alphabet Google Inc.');
                        expect(company.handle).toEqual('google');
                    });
                        
    });

/** DELETE /companies/handle 
 * returns `{message: "Company deleted" }` */
describe("DELETE /companies/:handle", async function() {
    test("Delete single company", async function() {
        const response = await request(app).delete('/companies/google');
        expect(response.body.message).toEqual("Company deleted");
    });
});

afterEach(async function() {
    // delete any data created by test
    await db.query("DELETE FROM companies");
});

afterAll(async function() {
// close db connection
await db.end();
});












