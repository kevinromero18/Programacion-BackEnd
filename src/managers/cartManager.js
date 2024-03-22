const fs = require('fs').promises;

class Cart {
    static id = 0;
    constructor() {
        this.id = Cart.id++;
        this.products = [];
    }
}

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            await fs.access(this.filePath);
        } catch (error) {
            await this.createCartFile();
        }
        await this.readCarts();
    }

    async createCartFile() {
        try {
            await fs.writeFile(this.filePath, '[]');
        } catch (error) {
            console.log('Error creando el archivo de carritos:', error.message);
        }
    }

    async readCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.log('Error leyendo los carritos:', error.message);
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.log('Error guardando los carritos:', error.message);
        }
    }

    async getCart(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    async createCart() {
        const cart = new Cart();
        this.carts.push(cart);
        await this.saveCarts();
        return cart;
    }

    async addProductToCart(cid, pid, quantity) {
        const cart = this.carts.find(cart => cart.id === cid);
        if (cart) {
            const existingProduct = cart.products.find(product => product.id === pid);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ id: pid, quantity });
            }
            await this.saveCarts();
            return true;
        } else {
            return false;
        }
    }
}

module.exports = CartManager;
