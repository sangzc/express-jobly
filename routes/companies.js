const Router = require("express").Router;
const Company = require("../models/company");

const router = new Router();

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
 * create a new company and return the newly created company.
 * return JSON of {company: companyData} */
router.post("/", async function (req, res, next){

    try{
        const newCompanyData = req.body;
        const company = await Company.create(newCompanyData);
        return res.json({company});
        
    } catch(err) {
        return next(err);
    }
})


router.get("/:handle", async function (req, res, next){
    try{
        
    } catch(err) {
        return next(err);
    }
})


/**
 * This will update an existing company and return the updated company.
    * This will return JSON of {company: companyData}
 */
router.patch("/:handle", async function (req, res, next) {
    try{
        const handle = req.params;
        const data = req.body;
        const company = await Company.update({...handle, ...data});
        return res.json({company});

    } catch(err) {
        return next(err);
    }
});

module.exports = router;