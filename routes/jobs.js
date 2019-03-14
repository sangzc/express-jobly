// /** job routes */






// // TODO 

// // CHECK THE ROUTES







// const Router = require("express").Router;
// const Job = require("../models/job");

// const router = new Router();

// const jsonschema = require("jsonschema");
// const jobSchemaPost = require("../schemas/jobSchemaPost.json");
// const jobSchemaPatch = require("../schemas/jobSchemaPatch.json");

// const ExpressError = require("../express_error");
// /**
//  * return the handle and name for all of the job objects. 
//  * query string parameters, 
//  * DISPLAY: name and handles
 




// ADD LOGIC




//  */
// router.get("/", async function (req, res, next){
//     try{
//         const jobQuery = req.query;
//         const jobs = await Job.getAll(jobQuery);
//         return res.json({jobs});

//     } catch(err) {
//         return next(err);
//     }
// })


// /**
//  * return a single job found by its id/handle.
//  * return JSON of {job: jobData}
//  */
// router.get("/:handle", async function (req, res, next){
//     try {
//         const handle = req.params.handle;
//         const job = await Job.getByHandle(handle);

//         return res.json({job});
//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * create a new job
//  * return JSON of {job: jobData} 
//  * */
// router.post("/", async function (req, res, next){
    
//     const results = jsonschema.validate(req.body, jobSchemaPost);

//     if(!results.valid){
//       let errList = results.errors.map( err => err.stack);
//       let error = new ExpressError(errList, 400);
//       return next(error);
//     }
//     try{
//         const newjobData = req.body;
//         const job = await Job.create(newjobData);
//         return res.json({job});
        
//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * update an existing job and return the updated job.
//  * return JSON of {job: jobData}
//  */
// router.patch("/:handle", async function (req, res, next) {
        
//     const results = jsonschema.validate(req.body, jobSchemaPatch);

//     if(!results.valid){
//       let errList = results.errors.map( err => err.stack);
//       let error = new ExpressError(errList, 400);
//       return next(error);
//     }
    
//     try{
//         const validation = validate(req.body, jobSchemaPatch);
//         if (!validation.valid) {
//             return next({
//                 status: 400,
//                 error: validation.errors.map(e => e.stack)
//             });
//         }
//         const handle = req.params;
//         const data = req.body;
//         const job = await Job.update({...handle, ...data});
//         return res.json({job});

//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * remove an existing job and return a message.
//  * return JSON of {message: "job deleted"}
//  */
// router.delete("/:handle", async function (req, res, next) {
//     try{

//         const handle = req.params.handle;
//         await Job.delete(handle);
//         return res.json({message: "job deleted"});

//     } catch(err) {
//         return next(err);
//     }
// });

// module.exports = router;