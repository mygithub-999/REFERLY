const express=require('express');
const jwt=require('jsonwebtoken');
const handleLogout=(req,res)=>{
    res.clearCookie('jwt',{
        httpOnly:true,
        secure:true,
        sameSite:"None"
    });
    res.sendStatus(200);
}

module.exports={handleLogout};