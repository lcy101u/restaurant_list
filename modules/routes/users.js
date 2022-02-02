const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
//login
router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

//register
router
  .route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if(!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填！' })
    }
    if(password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符。' })
    }
    //如果error直接返回
    if(errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    User.findOne({ email })
      .then(user => {
        if(user) {
          errors.push({ message: '此email已被註冊。' })
          return res.render('register', { errors, name, email, password, confirmPassword })
        } 
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({name, email, password: hash}))
          .then(() => res.redirect('/'))
          .catch(err => console.err(err))    
      })
  })

//logout
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的function，會清除session
  req.flash('success_msg', '已成功登出！')
  res.redirect('/users/login')
})

module.exports = router