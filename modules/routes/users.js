const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

//login
router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))

//register
router
  .route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    const { name, email, password, confirmPassword } = req.body
    console.table(req.body)
    User.findOne({ email })
      .then(user => {
        if(user) {
          console.log('User already exists!')
          res.render('register', { name, email, password, confirmPassword })
        } else {
          return User.create({name, email, password})
            .then(() => res.redirect('/'))
            .catch(err => console.err(err))
        }
      })
  })

//logout
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的function，會清除session
  res.redirect('/users/login')
})

module.exports = router