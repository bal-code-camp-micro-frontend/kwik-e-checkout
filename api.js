const { findProducts, addProduct } = require('./cart.js');

module.exports.renderHome = (req, res) => {
    console.log(findProducts(req.session.userId))
    res.render('home', {
        products: findProducts(req.session.userId)
    });
}

module.exports.renderTest = (req, res) => {
    res.render('test', {});
}

module.exports.apiAddProduct = (req, res) => {
    console.log('addProduct', req.session.userId, req.params.id)
    addProduct(req.session.userId, req.params.id)
    res.send('ok')
}
