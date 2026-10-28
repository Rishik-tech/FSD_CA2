const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    avaibility_status:{
        type:String,
        enum:["Available","Not Available"], 
        default:"Available"
    },
    creation_date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Book',bookSchema);