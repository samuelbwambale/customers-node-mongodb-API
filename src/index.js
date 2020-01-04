const express = require('express')

const app = express()

const path = require('path')

const personRoute = require('./routes/person')

// the order of adding the middlewares matters

// logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)

    next()
})

// register the person route
app.use(personRoute)
app.use(express.static('public'))

// Error middleware typically at the end
// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('Resource Not Found')
  })

// Handler for Error 500
app.use((err, req, res, next) => {
    // res.status(500).send(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))