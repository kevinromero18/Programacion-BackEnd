const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const rutaArchivo = './src/models/products.json';
const prodMgr = new ProductManager(rutaArchivo);
router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await prodMgr.getProducts();
    if (limit !== undefined) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await prodMgr.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!(title && description && code && price && stock && category)) {
        return res.status(400).json({ error: 'All fields except thumbnails are required' });
    }
    const product = await prodMgr.addProduct(title, description, code, price, stock, category, thumbnails);
    res.json(product);
});

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;
    const product = await prodMgr.updateProduct(pid, updateFields);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const result = await prodMgr.deleteProduct(pid);
    if (result) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

module.exports = router;