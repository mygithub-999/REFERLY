const jwt = require('jsonwebtoken');

verifyJWT=(req, res, next)=>{
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'LogOut and try again' });
    }req.user = user; //decoding the payload to access req.user.id or anything in further routes
    console.log('verifyJWT Hit');
    next();
  });
};

module.exports=verifyJWT;