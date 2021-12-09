const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./models/seeds/restaurant.json')
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/restaurant'
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

mongoose.connect(mongoDB)

const db = mongoose.connection
// 連線異常 on => event listener
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})
//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public')) //告訴express靜態檔案是放在名為 public 的資料夾中

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() ===req.params.restaurant_id)
  res.render('show', {restaurant})
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword))
  console.log(restaurants, keyword)
  res.render('index', {restaurants, keyword})
})
//start and listening on the Express server
app.listen(port , () => {
  console.log(`Express is listening on port ${port}`)
})