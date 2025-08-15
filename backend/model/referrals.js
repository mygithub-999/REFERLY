    // "id": "134d9da3-c801-462e-ace4-1050694c6eed",
    // "userId": "1753887938754",
    // "appname": "zomato",
    // "code": "XYZDFR",
    // "createdAt": "2025-07-30T15:06:42.532Z",
    // "uses": 4,
    // "maxUses": 5

const mongoose=require('mongoose');

const referralSchema=new mongoose.Schema({
    userId: String,
    appname: String,
    code: String,
    createdAt:Date,
    uses: Number,
    maxUses: Number
});

module.exports=mongoose.model('Referral', referralSchema);