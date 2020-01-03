const express = require('express')

const router = express.Router()

// Option 1
// Use a QueryString => query property on the request object
// Example: localhost:3000/person?name=samuel&age=20 //anything after '?' is the queryString
router.get('/person', (req, res) => {
    if(req.query.name) {
      res.send(`You have requested a person ${req.query.name}`)
    }
    else {
      res.send('You have requested a person')
    }
  })

// Option 2
// Use Params => params property on the request object
// Example: localhost:3000/person/samuel  //samuel is part of the route
router.get('/person/:name', (req, res) => {
    res.status(200).send(`You have requested a person ${req.params.name}`)
})


module.exports = router