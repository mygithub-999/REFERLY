// const usersDB = {
//   users: require('../model/users.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const mongoose=require('mongoose');
const usersDB=require('../model/userDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const fsPromises = require('fs').promises;
// const path = require('path');

const handleLogin = async (req, res) => {
  console.log('We here in AUTH');
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });
  const foundUser = await usersDB.findOne({email: req.body.email}).exec();
  if (!foundUser)
    return res.status(401).json({ message: 'User doesn\'t exist' });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match)
    return res.status(401).json({ message: 'Incorrect Password' });

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '90m' }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN,
    { expiresIn: '1d' }
  );

  foundUser.refreshToken=refreshToken;
  const result=await foundUser.save();

  // usersDB.setUsers(updatedUsers);
  // await fsPromises.writeFile(
  //   path.join(__dirname, '..', 'model', 'users.json'),
  //   JSON.stringify(updatedUsers)
  // );

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,         
    sameSite: 'Lax',    
    maxAge: 24 * 60 * 60 * 1000 
  });

  res.status(200).json({
    token: accessToken,
    userId: foundUser._id,
    name: foundUser.name,
  });
};

module.exports={handleLogin}
