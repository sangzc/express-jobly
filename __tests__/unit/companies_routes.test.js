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
            joblytest handle, name, num_employees, description, logo_url
        VALUES 'google', 'Google Inc.', 100000, 'meh', 'www.google.com'
        RETURNING handle, name, num_employees, description, logo_url`);
        
    company = result.rows[0];
});

afterEach(async function() {
    // delete any data created by test
    await db.query("DELETE FROM joblytest");
});

afterAll(async function() {
// close db connection
await db.end();
});


/** GET /company 
 * returns `{company: {handle, name}}` */
describe("GET /companies/:handle", async function() {
    test("Gets single company", async function() {
        const response = await request(app).get(`/companies/google`);
        const { company } = response.body;
        expect(response.statusCode).toEqual(200);
        expect(company).toHaveLength(1);
        expect(company[0]).toEqual({handle:"google", name:"Google Inc."});
    });
});












