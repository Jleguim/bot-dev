const express = require('express')
const app = express()
var port = process.env.PORT || 8080
app.get('/health', (req, res) => res.sendStatus(200))
app.listen(port, () => console.log('Listening %s', port))
