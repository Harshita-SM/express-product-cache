const productService = require('../services/productService')
const { clearCache } = require('../middleware/cacheMiddleware')


async function getProducts(req, res) {

    try {

        const products = await productService.getAllProducts()

        return res.json(products)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: 'Failed to get products'
        })
    }
}


async function getProductById(req, res) {

    try {

        const id = Number(req.params.id)

        const product =
            await productService.getProductById(id)

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            })
        }

        return res.json(product)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: 'Failed to get product'
        })
    }
}


async function createProduct(req, res) {

    try {

        const product =
            await productService.createProduct(req.body)

        clearCache()

        return res.status(201).json(product)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: 'Failed to create product'
        })
    }
}


async function updateProduct(req, res) {

    try {

        const id = Number(req.params.id)

        const product =
            await productService.updateProduct(
                id,
                req.body
            )

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            })
        }

        clearCache()

        return res.json(product)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: 'Failed to update product'
        })
    }
}


async function deleteProduct(req, res) {

    try {

        const id = Number(req.params.id)

        const product =
            await productService.deleteProduct(id)

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            })
        }

        clearCache()

        return res.json(product)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: 'Failed to delete product'
        })
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}