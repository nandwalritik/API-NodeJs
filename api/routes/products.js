const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const Product   = require('../models/product');
//const Data      = require('../models/product');
// const Data = mongoose.Schema;

//get() is a method that will handle incoming  get requests  
router.get('/',(req,res,next)=>{
    Product.find()
        .exec()
        .then(docs =>
            {
                console.log(docs);
                res.status(200).json(docs);
            })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}); 

mongoose.connect('mongodb://localhost/toDo',{
    useNewUrlParser:true
})
.then(()=>
{
    console.log('DataBase Connection Successfull!');
})
.catch(()=>{
    console.log('Error in database Connection');
});

router.post('/',(req,res,next)=>{
   
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title : req.body.title,
        completed:req.body.completed
    },{ versionKey: false });
    product.save().then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message:'Handling POST request to /products',
        createdProduct: product
    });
});


router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});

    });
    
});  
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    console.log("Updated PROP"+updateOps)
    Product.update({_id: id},{ $set: updateOps})
        .exec()
        .then(result =>{
                console.log(result);
                res.status(200).json(result);
            })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });

        });
});
router.put('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findOne({_id:id},function(err,foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!foundObject){
                res.status(500).send();
            }else{
                if(req.body.title){
                    foundObject.title = req.body.title;
                }

                if(req.body.completed)
                {
                    foundObject.completed = !foundObject.completed;
                }
                foundObject.save(function(err,updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send(updatedObject);
                        console.log(updatedObject);
                    }
                })
            }
        }
    })
    }
    
)
   


router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});     
router.delete('/',(req,res,next)=>{
   Product.remove()
   .exec()
   .then(result => {
       res.status(200).json(result);
   })
   .catch( err =>{
    console.log(err);
    res.status(500).json({
        error:err
    });
});
    
});   

module.exports = router;