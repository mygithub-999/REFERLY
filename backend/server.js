const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const path=require('path');
const session=require('express-session');
const port=process.env.PORT || 8000;
const mongoose=require('mongoose');
const dBconn=require('./config/dBconn');
const jwt=require('jsonwebtoken');
const loggingout=require('./routes/logout');
dBconn();
const passport = require('./config/passport');
const app = express();

// mongoose.connect(process.env.MONGODB_URI);

app.use(cors({
  origin: ['http://localhost:5000','https://referlyapp.netlify.app/'],
  credentials: true               
}));
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//Passport logic begins

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

function issueTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN,
    { expiresIn: '1d' }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: '7d' }
  );
  return { refreshToken };
}

app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'https://referlyapp.netlify.app/signup' }),
  async (req, res) => {
    const user = req.user;
    const { refreshToken } = issueTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None', 
      secure: true,   
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`https://referlyapp.netlify.app/user/${user._id}`);

    // res.status(201).json({ 
    //          userId:user._id , 
    //          token:accessToken
    // });
    // res.redirect(`http://localhost:5000/user/${user._id}`);

    
  }
);

//Passport logic ends

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/user', require('./routes/user'));
// app.use(verifyJWT);
app.use('/referral', require('./routes/referral'));

app.post('/logout',loggingout.handleLogout);

// const registerRouter = require('./router/register');
// console.log('registerRouter type:', typeof registerRouter);
// app.use('/register', registerRouter);

console.log('Check Check Check');

mongoose.connection.once('open',()=>{
  console.log('Connected to MongoDB');
  app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
  });
});
