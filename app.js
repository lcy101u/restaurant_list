const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./modules')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 3000

const usePassport = require('./config/passport')
require('./config/mongoose')

//setting template engine
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers: {
    compare: function (a, b) {
      if(a === b) return 'selected'
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'RestaurantSecret',
  resave: false,
  saveUninitialized: true
}))
//setting static files
app.use(express.static('public')) //告訴express靜態檔案是放在名為 public 的資料夾中
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') //把flash存到locals上
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

//start and listening on the Express server
app.listen(port , () => {
  console.log(`Express is listening on port ${port}`)
})