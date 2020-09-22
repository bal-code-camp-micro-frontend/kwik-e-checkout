"use strict";

const express = require('express')
const exphbs = require('express-handlebars');
const { v4: uuidv4 } = require('uuid');
const cookieSession = require('cookie-session')
const { renderHome, apiAddProduct, apiGetProduct, apiGetAllProducts, apiRemoveProduct, renderTest } = require('./api');
const { addProduct, mockCheckoutCart } = require('./cart');
const app = express()
const port = 8080

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(cookieSession({
    name: 'session',
    keys: ['kwik-e-mart'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/', (req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = uuidv4()
        addProduct(req.session.userId, 1)
        addProduct(req.session.userId, 2)
    }
    mockCheckoutCart(req.session.userId)
    next()
})

const router = express.Router()
router.use(express.static('public'))
router.get('/', renderHome);
router.get('/test', renderTest);
app.use('/c', router)

const apiRouter = express.Router()
apiRouter.get('/product', apiGetAllProducts)
apiRouter.get('/product/:id', apiGetProduct)
apiRouter.put('/product/:id', apiAddProduct)
apiRouter.delete('/product/:id', apiRemoveProduct)
app.use('/c/api', apiRouter)

app.get('/healthz', (_, res) => res.send('ok'))

app.listen(port, () => {
    console.log(`Healthz => http://localhost:${port}/healthz`)
    console.log(`Homepage => http://localhost:${port}/c`)
    console.log(`Test Page => http://localhost:${port}/c/test`)
})
