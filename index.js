const express = require('express')
const dbConnection = require('./config/config')
const app = express()
const PORT = 8080

const routes = require("./routes/posts")

app.use(express.json())


app.use('/', routes)

dbConnection()
 
app.listen(PORT, () => console.log(`El servidor está escuchando en http://localhost:${PORT}`))

module.exports = app