const data = require('./data.json');

const users = new Map()

const getUser = (userId) => {
    if (!users.has(userId)) {
        users.set(userId, { products: new Map() })
    }
    return users.get(userId)
}

const findProduct = (productId) => {
    return data.filter(d => d.id === parseInt(productId, 10))
}

module.exports.mockCheckoutCart = (userId) => {
    const user = getUser(userId)
    user.products.set(1, findProduct(1)[0])
    user.products.set(14, findProduct(14)[0])
    user.products.set(22, findProduct(22)[0])
    user.products.set(34, findProduct(34)[0])
}

module.exports.findProducts = (userId) => {
    const user = getUser(userId)
    return user.products
}

module.exports.addProduct = (userId, productId) => {
    const user = getUser(userId)
    const product = findProduct(parseInt(productId, 10))
    if (product.length > 0) {
        user.products.set(parseInt(productId, 10), product[0])
    }
}

module.exports.removeProduct = (userId, productId) => {
    const user = getUser(userId)
    user.products.delete(parseInt(productId, 10))
}
