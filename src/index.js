const express = require('express');
const cors = require('cors')
require('dotenv').config();
require('./db/conn')

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`App is running on port # ${port}`)
})