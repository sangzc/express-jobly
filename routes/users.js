// /** User routes */






// // TODO 

// // CHECK THE ROUTES







// const Router = require("express").Router;
// const User = require("../models/user");

// const router = new Router();

// const jsonschema = require("jsonschema");
// const userSchemaPost = require("../schemas/userSchemaPost.json");
// const userSchemaPatch = require("../schemas/userSchemaPatch.json");

// const ExpressError = require("../express_error");
// /**
//  * return the handle and name for all of the user objects. 
//  * query string parameters, 
//  * DISPLAY: name and handles
 
 




// ADD LOGIC




//  */
// router.get("/", async function (req, res, next){
//     try{
//         const userQuery = req.query;
//         const userSchemaPatch = await User.getAll(userQuery);
//         return res.json({userSchemaPatch});

//     } catch(err) {
//         return next(err);
//     }
// })


// /**
//  * return a single user found by its id/handle.
//  * return JSON of {user: userData}
//  */
// router.get("/:handle", async function (req, res, next){
//     try {
//         const handle = req.params.handle;
//         const user = await User.getByHandle(handle);

//         return res.json({user});
//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * create a new user
//  * return JSON of {user: userData} 
//  * */
// router.post("/", async function (req, res, next){
    
//     const results = jsonschema.validate(req.body, userSchemaPost);

//     if(!results.valid){
//       let errList = results.errors.map( err => err.stack);
//       let error = new ExpressError(errList, 400);
//       return next(error);
//     }
//     try{
//         const newuserData = req.body;
//         const user = await User.create(newuserData);
//         return res.json({user});
        
//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * update an existing user and return the updated user.
//  * return JSON of {user: userData}
//  */
// router.patch("/:handle", async function (req, res, next) {
        
//     const results = jsonschema.validate(req.body, userSchemaPatch);

//     if(!results.valid){
//       let errList = results.errors.map( err => err.stack);
//       let error = new ExpressError(errList, 400);
//       return next(error);
//     }
    
//     try{
//         const validation = validate(req.body, userSchemaPatch);
//         if (!validation.valid) {
//             return next({
//                 status: 400,
//                 error: validation.errors.map(e => e.stack)
//             });
//         }
//         const handle = req.params;
//         const data = req.body;
//         const user = await user.update({...handle, ...data});
//         return res.json({user});

//     } catch(err) {
//         return next(err);
//     }
// })

// /**
//  * remove an existing user and return a message.
//  * return JSON of {message: "user deleted"}
//  */
// router.delete("/:handle", async function (req, res, next) {
//     try{

//         const handle = req.params.handle;
//         await User.delete(handle);
//         return res.json({message: "user deleted"});

//     } catch(err) {
//         return next(err);
//     }
// });

// module.exports = router;