const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./modules')
const app = express()
const port = 3000

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

//setting static files
app.use(express.static('public')) //告訴express靜態檔案是放在名為 public 的資料夾中
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

//start and listening on the Express server
app.listen(port , () => {
  console.log(`Express is listening on port ${port}`)
})