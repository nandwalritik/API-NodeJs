const express       =   require('express')                  //importing package express
const app           =   express();                          //creating a variable app and execting express like a function
const morgan        =   require('morgan');
const bodyParser    =   require('body-parser');
const productRoutes =   require('./api/routes/products');

const mongoose      =   require('mongoose')                 //import mongoos
mongoose.connect('mongodb://localhost/toDo',{
    useNewUrlParser:true
});                                                         //connect mongoos
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Acess-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({}); 
    }
    next();
});
// Routes which should handle requests
app.use('/products',productRoutes);             //anything starting with /products will be forwarded to products.js
// app.use('/orders',ordersRoutes);
app.use((res,req,next)=>{
    const error = new Error('Not found');
    error.status=404; 
    next(error)
});
app.use((error,req,res,next)=>{
   res.status(error.status || 500) 
   res.json({
       error:{
           message: error.message
       }
   });
});
module.exports = app;                           //exporting the app.js

/*
use() acts as a middleware which gets request response and next function as argument
response to send a response
Argument of status must be status response let it be 200
.json() is used to send json response
we can pass a  js object inside argument of json() method
json data send overthe wire is in string format
app.use() they all are middleWares
*/