const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => res.render('new'))
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router
  .route('/:id')
  .get((req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
      .lean()
      .then((restaurant) => res.render('show', {restaurant}))
      .catch(error => console.error(error))
  })
  .put((req, res) => {
    req.body.userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOneAndUpdate(_id, req.body)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.error(error))
  })
  .delete((req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
  })

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.error(error))
})

module.exports = router