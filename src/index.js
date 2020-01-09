const express = require('express')
const app = express()
const path = require('path')
const personRoute = require('./routes/person')
const customerRoute = require('./routes/customer')
const bodyParser = require('body-parser') // allows us to extract the body of the request message in JSON format. 
                                          // when we use the body parser, what happens is that for the incoming request, 
                                          // the body of the incoming request will be parsed and then added into the 'req' object as req.body. 
                                          // So the req.body will give you access to whatever is inside that body of the message

/* req.query, req.params and req.body 

    req.query comes from query parameters in the URL such as http://foo.com/somePath?name=ted 
    where req.query.name === "ted".

    req.params comes from path segments of the URL that match a parameter in the route definition 
    such as /song/:songid. So, with a route using that designation and a URL such as /song/48586, 
    then req.params.songid === "48586".

    req.body properties come from a form post where the form data (which is submitted in the body contents) 
    has been parsed into properties of the body tag.
*/

// the order of adding the middlewares matters
// Error middleware typically at the end

// To take incoming body and create an attribute 'body' of JSON format
app.use(bodyParser.json())

// logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)

    next()
})

app.use(personRoute) // mount the personRouter, any request to /persons will be handled by personRoute
app.use(customerRoute)

app.use(express.static('public'))

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