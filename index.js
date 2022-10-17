const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./config/routes');

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(routes)

app.listen(4000,() =>{
    console.log('API está funcionando')
})