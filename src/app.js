const path = require('path')
const express = require('express')
const rp = require('request-promise')

const app = express()

app.set('view engine', 'hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const apiRoute = require('./routes/api-load')

app.get('', (req, res) => {
    res.render('index')
})

app.use('/api', apiRoute)

app.listen(3000, () => {
    console.log("Server is up and running.")
})
