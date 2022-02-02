if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))
  }
]

db.once('open', async () => {
  console.log('User seeder running ...')
  for(let i=0; i< users.length; i++) {
    const email = users[i].email
    await User.findOne({email})
      .then(user => {
        if(!user) {
          console.log('create user!!')
          return User.create(users[i])
        }
      })
      .catch(err => console.error(err))
  }
  db.close()
})