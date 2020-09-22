const data = require('./data.json');

const users = new Map()

const getUser = (userId) => {
    if (!users.has(userId)) {
        users.set(userId, { products: new Map() })
    }
    return users.get(userId)
}

const findProduct = (productId) => {
    return data.filter(d => d.id == productId)
}

module.exports.mockCheckoutCart = (userId) => {
    const user = getUser(userId)
    user.products.set(1, findProduct(1))
    user.products.set(14, findProduct(14))
}

module.exports.findProducts = (userId) => {
    const user = getUser(userId)
    console.log('findProducts =>', user.products)
    return user.products
}

module.exports.addProduct = (userId, productId) => {
    const user = getUser(userId)
    user.products.set(productId, findProduct(productId))
}

module.exports.removeProduct = (userId, productId) => {
    const user = getUser(userId)
    user.products.delete(productId)
}
