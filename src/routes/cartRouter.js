const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');

const rutaArchivo = './cart.json';
const cartMgr = new CartManager(rutaArchivo);

router.post('/', async (req, res) => {
    const cart = await cartMgr.createCart();
    res.json(cart);
});

router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await cartMgr.getCart(cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity) || 1;
    const result = await cartMgr.addProductToCart(cid, pid, quantity);
    if (result) {
        res.json({ message: 'Product added to cart successfully' });
    } else {
        res.status(404).json({ error: 'Cart or product not found' });
    }
});

module.exports = router;
