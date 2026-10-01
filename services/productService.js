const db = require('../database/db')

async function getAllProducts() {

    const products = await db.readData()

    return products
}

async function getProductById(id) {

    const products = await db.readData()

    const product = products.find(
        (item) => item.id === id
    )

    return product
}

async function createProduct(product) {

    const products = await db.readData()

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        ...product
    }

    products.push(newProduct)

    await db.writeData(products)

    return newProduct
}

async function updateProduct(id, updatedData) {

    const products = await db.readData()

    const index = products.findIndex(
        (item) => item.id === id
    )

    if (index === -1) {
        return null
    }

    products[index] = {
        ...products[index],
        ...updatedData,
        id: id
    }

    await db.writeData(products)

    return products[index]
}

async function deleteProduct(id) {

    const products = await db.readData()

    const index = products.findIndex(
        (item) => item.id === id
    )

    if (index === -1) {
        return null
    }

    const deletedProduct = products[index]

    products.splice(index, 1)

    await db.writeData(products)

    return deletedProduct
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}