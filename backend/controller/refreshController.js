const jwt = require('jsonwebtoken');
// const usersDB = {
//   users: require('../model/users.json'),
// };
const usersDB=require('../model/userDB');

const handleRefreshToken = async(req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({'message':'Cookie Error'}); 
  }

  const refreshToken = cookies.jwt;

  const foundUser = await usersDB.findOne({refreshToken});
  if (!foundUser) {
    return res.status(403).json({'message':'Invalid User'}); 
  }

  // console.log("Cookie JWT:", req.cookies.jwt);
  // console.log("Secret being used:", import.meta.env.REFRESH_TOKEN);

  jwt.verify(refreshToken, import.meta.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({'message':'Invalid User'});
    }
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
      },
      import.meta.env.ACCESS_TOKEN,
      { expiresIn: '1d' }
    );

    res.json({ token: accessToken, userId:foundUser.id });
  });
};

module.exports = {handleRefreshToken};
