const mongoose=require('mongoose')
const Schema= mongoose.Schema;

const userSchema=new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String
    },
    name:{
        type: String,
        required: true
    },
    googleId:String,
    refreshToken: String
});

module.exports=mongoose.model('User',userSchema);