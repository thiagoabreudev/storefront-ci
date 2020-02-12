require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./api');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api);


app.listen(process.env.STOREFRONT_CI_PORT || 3000, () => {
  console.log(`storefront app is a live...`)
})



