const express = require('express');
const router = express.Router();
const User = require('./models/User');
const passwordHash = require('password-hash');
const { request } = require('express');

//getUsers
router.get('/:email',(req,res)=>{
    
    const email_in=req.params.email
    
    
    
    User.count({email:email_in}, function (err, count){
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        } 
        
        if(count>0){
            var query = User.findOne({email:req.params.email}).select('name -_id email');
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
    User.count({email:email_in}, function (err, count) {
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            User.updateOne({email:email_in},{$set:{email:new_email}},(error,data)=>{
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
    User.count({email:email_in }, function (err, count) {
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            User.deleteOne({email:email_in},(error,data)=>{
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
    
    User.count({email: req.body.email}, function (err, count) {
      
        if(err){
            console.log("MongoDB Error: " + err);
            return false;
        }
        
        
        if (count>0){
            res.json("email already exists")
        }
        else{
            const hashedPassword = passwordHash.generate(req.body.password); 
            const user = new User({
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