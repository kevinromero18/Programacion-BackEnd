const fs = require('fs').promises;

class Product {
    static id = 0;
    constructor(title, description, code, price, stock, category, thumbnails) {
        this.id = Product.id++;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails || [];
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.readProducts();
    }

    async addProduct(title, description, code, price, stock, category, thumbnails) {
        const product = new Product(title, description, code, price, stock, category, thumbnails);
        this.products.push(product);
        await this.createProducts();
        return product;
    }

    async updateProduct(id, updateFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updateFields };
            await this.createProducts();
            return this.products[productIndex];
        } else {
            return null;
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.createProducts();
            return true;
        } else {
            return false;
        }
    }

    async createProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log('Error escribiendo productos:', error.message);
        }
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log('Error leyendo los productos:', error.message);
            this.products = [];
        }
    }
}

module.exports = ProductManager;
