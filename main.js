const fs = require('fs').promises;
const rutaArchivo = './products.json';
class Product {
    static id = [];
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = Product.id++;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.readProducts();
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log('Todos los campos son obligatorios');
            return;
        };
        if (this.products.some(product => product.code === code)) {
            console.log('Ya existe un Producto con el mismo codigo');
            return;
        };
        const newProduct = new Product (title, description, price, thumbnail, code, stock);
        this.products.push(newProduct);
        await this.createProducts();
    };
    getProducts() {
        return this.products;
    };
    getProductById(id) {
        const getProductById = this.products.find(product => product.id === id);
        if (getProductById) {
            return getProductById;
        } else {
            console.log('NOT FOUND');
            return null;
        };
    };
    async createProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
        } catch (error) {
            console.log('Error escribiendo productos:', error.message);
        };
    };
    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log('Error leyendo los productos:', error.message);
            this.products = [];
        };
    };
    async updateProducts(id, updateProducts) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = {...this.products[index], ...updateProducts};
            await this.createProducts();
            console.log('Producto Actualizado!');
        } else {
            console.log('El Producto no pudo Actualizarse!');
        };
    };
    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.createProducts();
            console.log('Producto Eliminado');
        } else {
            console.log('Producto no Encontrado');
        };
    };

};

const prodMgr = new ProductManager(rutaArchivo);

prodMgr.addProduct('NIKE', 'ZAPATILLA NIKE', '$50,000', 'https://i.pinimg.com/564x/c3/57/d5/c357d503882fab5507f0376a50fa0bd9.jpg', '001', '30');

prodMgr.addProduct('ADIDAS', 'ZAPATILLA ADIDAS', '$60,000', 'https://i.pinimg.com/originals/78/63/46/7863460405ffc7fa6195601bad60a879.jpg', '002', '10');

prodMgr.addProduct('PUMA', 'ZAPATILLA PUMA', '$30,000', 'https://i.pinimg.com/originals/76/f6/01/76f6018113595149412c61e5dd78ccf0.jpg', '003', '50');

const products = prodMgr.getProducts();
products.forEach(product => console.log(product.id, product.title, product.description, product.price, product.thumbnail, product.code, product.stock));

const id = 0;
const getProductById = prodMgr.getProductById(id);
if (getProductById) {
    console.log(getProductById);
};

