const express = require('express')

const app = express()

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))