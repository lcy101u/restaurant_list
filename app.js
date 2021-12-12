const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./modules')
const app = express()
const port = 3000

require('./config/mongoose')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public')) //告訴express靜態檔案是放在名為 public 的資料夾中
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurantsData = restaurants.filter(
        restaurant => restaurant.name.toLowerCase().includes(keyword) || 
                      restaurant.name_en.toLowerCase().includes(keyword) || 
                      restaurant.category.toLowerCase().includes(keyword))
      res.render('index', {restaurants: filteredRestaurantsData, keyword})
    })
})

//start and listening on the Express server
app.listen(port , () => {
  console.log(`Express is listening on port ${port}`)
})