const mongoose=require('mongoose');
require('dotenv').config();
const connection=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongo Conn')
    }
    catch(err){
        console.error('Mongo Error: ',err);
    }
}

module.exports=connection;