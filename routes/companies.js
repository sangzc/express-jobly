/** Company routes */

const Router = require("express").Router;
const Company = require("../models/company");

const router = new Router();

const jsonschema = require("jsonschema");
const companySchemaPost = require("../schemas/companySchemaPost.json");
const companySchemaPatch = require("../schemas/companySchemaPatch.json");

const ExpressError = require("../express_error");

/**
 * create a new company
 * return JSON of {company: {name, handles}} 
 * */
router.post("/", async function (req, res, next){
    
    const results = jsonschema.validate(req.body, companySchemaPost);

    if(!results.valid){
      let errList = results.errors.map( err => err.stack);
      let error = new ExpressError(errList, 400);
      return next(error);
    }
    try{
        const newCompanyData = req.body;
        const company = await Company.create(newCompanyData);
        return res.json({company});
        
    } catch(err) {
        return next(err);
    };
});


/**
 * return the handle and name for all of the company objects. 
 * query string parameters, 
 * DISPLAY: name and handles
 
 * search: 
 *  - a filtered list of handles and names 
 *  - handles should be displayed based on the search term and if the name includes it.
 * min_employees: 
 *  - companies with num_employees > min_employees.
 * max_employees:
 * - companies with num_employees < max_employees.
 * min_employees > max_employees: 400 status and a message
 * 
 * RETURN JSON of 
 *  {companies: [companydata, ...]}   means:             
 *  {companies: [{name, handles}, ...]}
 */
router.get("/", async function (req, res, next){
    try{
        const companyQuery = req.query;
        const companies = await Company.getAll(companyQuery);
        return res.json({companies});

    } catch(err) {
        return next(err);
    }
})


/**
 * return a single company found by its id/handle.
 * return JSON of {company: {name, handles, num_employees, description, logo_url}}
 */
router.get("/:handle", async function (req, res, next){
    try {
        const handle = req.params.handle;
        const company = await Company.getByHandle(handle);

        return res.json({company});
    } catch(err) {
        return next(err);
    }
})


/**
 * update an existing company and return the updated company.
 * return JSON of {company: companyData}
 */
router.patch("/:handle", async function (req, res, next) {
        
    const results = jsonschema.validate(req.body, companySchemaPatch);

    if(!results.valid){
      let errList = results.errors.map( err => err.stack);
      let error = new ExpressError(errList, 400);
      return next(error);
    }
    
    try{
        const handle = req.params;
        const data = req.body;
        const company = await Company.update({...handle, ...data});
        return res.json({company});

    } catch(err) {
        return next(err);
    }
})

/**
 * remove an existing company and return a message.
 * return JSON of {message: "Company deleted"}
 */
router.delete("/:handle", async function (req, res, next) {
    try{

        const handle = req.params.handle;
        await Company.delete(handle);
        return res.json({message: "Company deleted"});

    } catch(err) {
        return next(err);
    }
});

module.exports = router;