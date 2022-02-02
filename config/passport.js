const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  //Passport initialization
  app.use(passport.initialize())
  app.use(passport.session())

  //Local 驗證
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if(!user) {
          return done(null, false, { type:'warning_msg', message: 'email 尚未註冊。' })
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if(!isMatch) {
            return done(null, false, { type:'warning_msg', message: '密碼錯誤。' })
          }
          return done(null, user)
        })
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