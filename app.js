const express = require('express');
const  mongoose  = require('mongoose');
const bodyParser=require('body-parser');
const  cors=require('cors');
const app=express();


const routes = require('./routes');

app.get('/',(req,res)=>{
    
    res.send("Home Page");
})

app.use(bodyParser.json());
app.use('/users', routes);
app.use(cors());







const db_url=
"mongodb+srv://Mohaned:db_pass123@cluster0.op5r1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"    //add password in env variables 
mongoose.connect(db_url, {useNewUrlParser: true,useUnifiedTopology: true}, () =>{
    console.log("Connected to DB");
});
app.listen(4000); 