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
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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
}

const prodMgr = new ProductManager;

prodMgr.addProduct('NIKE', 'ZAPATILLA NIKE', '$50,000', 'https://i.pinimg.com/564x/c3/57/d5/c357d503882fab5507f0376a50fa0bd9.jpg', '001', '30');

prodMgr.addProduct('ADIDAS', 'ZAPATILLA ADIDAS', '$60,000', 'https://i.pinimg.com/originals/78/63/46/7863460405ffc7fa6195601bad60a879.jpg', '002', '10');

prodMgr.addProduct('PUMA', 'ZAPATILLA PUMA', '$30,000', 'https://i.pinimg.com/originals/76/f6/01/76f6018113595149412c61e5dd78ccf0.jpg', '003', '50');

prodMgr.addProduct('PUMA', 'ZAPATILLA PUMA', '$30,000', 'https://i.pinimg.com/originals/76/f6/01/76f6018113595149412c61e5dd78ccf0.jpg', '003', '50');

const products = prodMgr.getProducts();
products.forEach(product => console.log(product.id, product.title, product.description, product.price, product.thumbnail, product.code, product.stock));

const id = 0;
const getProductById = prodMgr.getProductById(id);
if (getProductById) {
    console.log(getProductById);
};

