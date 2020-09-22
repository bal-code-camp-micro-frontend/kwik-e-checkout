const { findProducts, addProduct, removeProduct } = require('./cart.js');

function toArray(map) {
    const array = []
    map.forEach(item => array.push(item))
    return array
}

module.exports.renderHome = (req, res) => {
    const products = findProducts(req.session.userId)
    res.render('home', {
        products: toArray(products),
    });
}

module.exports.apiGetAllProducts = (req, res) => {
    const products = findProducts(req.session.userId)
    res.json(toArray(products))
}

module.exports.apiGetProduct = (req, res) => {
    const products = findProducts(req.session.userId)
    if (products.has(parseInt(req.params.id, 10))) {
        res.json(products.get(parseInt(req.params.id, 10)))
    } else {
        res.status(404).send('Not found')
    }
}

module.exports.renderTest = (req, res) => {
    res.render('test', {});
}

module.exports.apiAddProduct = (req, res) => {
    addProduct(req.session.userId, req.params.id)
    res.json()
}

module.exports.apiRemoveProduct = (req, res) => {
    removeProduct(req.session.userId, req.params.id)
    res.json()
}
