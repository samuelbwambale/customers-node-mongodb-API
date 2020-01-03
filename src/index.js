const express = require('express')

const app = express()

const personRoute = require('./routes/person')
// register the person route
app.use(personRoute)
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))