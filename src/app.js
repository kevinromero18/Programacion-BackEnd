const express = require('express');
const fs = require('fs').promises;
const productRouter = require('./routes/productRouter.js');
const cartRouter = require('./routes/cartRouter.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});