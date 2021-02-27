const express = require('express');
const router = express.Router();
const User = require('./models/User');
const passwordHash = require('password-hash');  //password hashing module
const { request } = require('express');

//getUsers
router.get('/:email',(req,res)=>{
    
    const email_in=req.params.email
    
    
    
    User.count({email:email_in}, function (err, count){       //check if the requested email exists
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        } 
        
        if(count>0){
            var query = User.findOne({email:req.params.email}).select('name -_id email');    //returns the user's details whose email was requested 
            query.exec(function (err, data) {
                if (err) return next(err);
                res.json(data);
            });
        }else{
            res.json("No user found with this email")
        }
        
    });
    
});
    



//update
router.patch('/:email',(req,res)=>{
    const email_in=req.params.email
    const new_email=req.body.email
    User.count({email:email_in}, function (err, count) {    //check if the requested email exists
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            User.updateOne({email:email_in},{$set:{email:new_email}},(error,data)=>{        //changes the user's email to the one provided in the request's body
                if(error){
                    console.log(error);
               }
               else{       
             
                res.json("changed email to "+new_email);
               }
            })
            
        }
        
        else{
            res.json("no user found with this email")
        }
    });
})


//Delete
router.delete('/:email',(req,res) =>{
    const email_in=req.params.email 
    User.count({email:email_in }, function (err, count) {      //check if the requested email exists
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            User.deleteOne({email:email_in},(error,data)=>{                //deletes the user whose email was sent in the request
                if(error){
                    console.log(error);
               }
               else{       
             
                res.json("deleted user "+email_in);
               }
            });
            
        }
        
        else{
            res.json("no user found with this email")
        }
    });
    
    
   
});




//ADD
router.post('/',(req,res)=>{
    
    User.count({email: req.body.email}, function (err, count) {       //check if the requested email exists
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            res.json("email already exists")
        }
        else{
            const hashedPassword = passwordHash.generate(req.body.password); //hash password for security
            const user = new User({                      //creates a new user with the provided details from the request body
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email
            }) ;
            
            user.save()
            .then(data => {
                res.json("Added new user with name: "+user.name);      
            })
            .catch(err =>{
                console.log("failed to add new user");
                res.json({message:err});
            })   
        }
    });
    

});


module.exports=router;
