require('dotenv').config();
const jwt=require('jsonwebtoken');
// const usersDB={
//     users:require('../model/users.json'),
//     setUsers:function(data){
//         this.users=data
//     }
// }

const mongoose=require('mongoose');
const usersDB=require('../model/userDB');

// const fsPromises=require('fs').promises;
// const path=require('path');
const bcrypt=require('bcrypt');

const handleNewUser=async(req,res)=>{
    const name=req.body.name;
    const password=req.body.password;
    const email=req.body.email;

    if(!name || !password || !email)
        return res.status(400).json({'message':'No field must be empty'});

    const duplicate=await usersDB.findOne({email: email}).exec();

    if(duplicate)
        return res.status(409).json({'message':'Email already exists!'});
    try{
        const hashedPwd=await bcrypt.hash(password,10);
        const newUser=await usersDB.create(
            {
                name:name,
                email:email,
                password:hashedPwd
            }
        )
        // usersDB.setUsers([...usersDB.users,newUser]);

        // await fsPromises.writeFile(
        //     path.join(__dirname, '..','model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        const accessToken=jwt.sign(
            {id:newUser._id, name:newUser.name,email:newUser.email},
            import.meta.env.ACCESS_TOKEN,
            {expiresIn:'1d'}
        )

        const refreshToken = jwt.sign(
            { id: newUser._id, email: newUser.email },
            import.meta.env.REFRESH_TOKEN,
            { expiresIn: '7d' }
        );

        newUser.refreshToken = refreshToken;
        await newUser.save();

        
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000, 
        });

        res.status(201).json({
            'success': `User ${name} registered!`, 
             userId:newUser._id , 
             name:newUser.name,
             token:accessToken
        });
    }
    catch(err){
        res.status(500).json({'message': err.message});
        console.log("Error from registerController");
    }
}

module.exports={handleNewUser};