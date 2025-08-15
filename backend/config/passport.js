const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userDB');

passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL
  },
  async (_googleAccess, _googleRefresh, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value?.toLowerCase();
      const name  = profile.displayName || 'User';
      const googleId = profile.id;

      if (!email) return done(null, false);

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ email, name, googleId });
      } else if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
