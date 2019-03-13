const Router = require("express").Router;
const Company = require("../models/company");

const router = new Router();

router.get("/", async function (req, res, next){
    try{


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
        const newCompany = await Company.create(newCompanyData);
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
        const company = await Company.update({handle, ...data});
        return res.json({company});

    } catch(err) {
        return next(err);
    }
});