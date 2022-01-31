const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  //Passport initialization
  app.use(passport.initialize())
  app.use(passport.session())

  //Local 驗證
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if(!user) {
          return done(null, false, { message: 'This email is not register.' })
        }
        if(password !== user.password) {
          return done(null, false, { message: 'Password incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => done(err))
    }))

  //serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
     .lean()
     .then(user => done(null, user))
     .catch(err => done(err))
  })
}