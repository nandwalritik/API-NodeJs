const mongoose      = require('mongoose');
const productSchema = mongoose.Schema({
    _id     :  mongoose.Schema.Types.ObjectId,  //specific format mongoose uses internnaly 
    title    :  String,
    completed : false,
    
},{ versionKey: false });

module.exports = Product = mongoose.model('Product',productSchema)