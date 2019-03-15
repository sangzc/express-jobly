/** job routes */

const Router = require("express").Router;
const job = require("../models/job");

const router = new Router();

const jsonschema = require("jsonschema");
const jobSchemaPost = require("../schemas/jobSchemaPost.json");
const jobSchemaPatch = require("../schemas/jobSchemaPatch.json");

const ExpressError = require("../express_error");

/**
 * create a new job
 * return JSON of {job: {id, title, salary, equity, company_id, date_posted }} 
 * */
router.post("/", async function (req, res, next){
    
    const results = jsonschema.validate(req.body, jobSchemaPost);

    if(!results.valid){
      let errList = results.errors.map( err => err.stack);
      let error = new ExpressError(errList, 400);
      return next(error);
    }
    try{
        const newjobData = req.body;
        const job = await Job.create(newjobData);
        return res.json({job});
        
    } catch(err) {
        return next(err);
    };
});


/**
 *
 * OPTIONAL QUERYSTRING INPUTS:
 *  search, min_employees, max_employees
 * 
 * RETURN JSON of the id and name for all of the job objects. 
 *  {jobs: [jobdata, ...]}   means:             
 *  {jobs: [{name, id}, ...]}
 */

router.get("/", async function (req, res, next){
    try{
        const jobQuery = req.query;
        const jobs = await Job.getAll(jobQuery);
        return res.json({jobs});

    } catch(err) {
        return next(err);
    }
})


/**
 * return a single job found by its id
 * return JSON of {job: {id, title, salary, equity, company_id, date_posted }} 
 */
router.get("/:id", async function (req, res, next){
    try {
        const id = req.params.id;
        const job = await Job.getByid(id);

        return res.json({job});
    } catch(err) {
        return next(err);
    }
})


/**
 * update an existing job  
 * return JSON of {job: {name, id, num_employees, description, logo_url}}
 */
router.patch("/:id", async function (req, res, next) {
    
    // possible refactor: jsonschema how to include custom messages per error type
    // this is extra level added, since jsonschema will catch the following error, however, doesn't return user friendly message at the moment.
    // id could not be updated by frontend, hence req.body should not have id or if req.body includes id, it should be the same as req.params.id.
    if (req.body.id !== undefined && req.body.id !== req.params.id) {
        throw new Error ("To change job's id, please contact admin.")
    }
    
    // to prevent passing of any additional argument (here, id should not be included in
    // req.body) can set jobSchemaPatch values of "additionalProperties": false 

    const results = jsonschema.validate(req.body, jobSchemaPatch);



    if(!results.valid){
      let errList = results.errors.map( err => err.stack);
      let error = new ExpressError(errList, 400);
      return next(error);
    }
    
    try {
        const id = req.params.id;
        const data = req.body;
        const job = await Job.update({...data, id});
        return res.json({job});
    } catch(err) {
        return next(err);
    }
})

/**
 * remove an existing job
 * return JSON of {message: "job deleted"}
 */
router.delete("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        await Job.delete(id);
        return res.json({message: "job deleted"});

    } catch(err) {
        return next(err);
    }
});

module.exports = router;