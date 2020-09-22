"use strict";

const express = require('express')
const exphbs = require('express-handlebars');
const { renderHome } = require('./api');
const data = require('./data.json');
const app = express()
const port = 8080

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

const router = express.Router()
router.use(express.static('public'))
router.get('/', renderHome);
app.use('/c', router)

const apiRouter = express.Router()
app.use('/c/api', apiRouter)

app.get('/healthz', (_, res) => res.send('ok'))

app.listen(port, () => {
    console.log(`Healthz => http://localhost:${port}/healthz`)
    console.log(`Homepage => http://localhost:${port}/c`)
})
