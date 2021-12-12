const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./models/seeds/restaurant.json')
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/restaurant'
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const { redirect } = require('express/lib/response')
const restaurant = require('./models/restaurant')
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
db.once('disconnected', () => {
  console.lo('MongoDB disconnevted!')
})
//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public')) //告訴express靜態檔案是放在名為 public 的資料夾中
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})
app.get('/restaurants/new', (req, res) => res.render('new'))
app.post('/restaurants', (req, res) => {
  console.log(req.body)
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
    .catch(error => console.error(error))
})
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.error(error))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})
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